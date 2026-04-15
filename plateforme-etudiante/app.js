(function () {
  const data = window.platformData;
  const storageKey = "adid-platform-progress-v2";

  function readState() {
    try {
      const parsed = JSON.parse(window.localStorage.getItem(storageKey));
      return parsed && typeof parsed === "object" ? parsed : { saved: {} };
    } catch (error) {
      return { saved: {} };
    }
  }

  function writeState(state) {
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  }

  function getAxis(axisId) {
    return data.axes.find(function (axis) {
      return axis.id === axisId;
    }) || data.axes[0];
  }

  function getObjective(axis, objectiveId) {
    return axis.objectives.find(function (objective) {
      return objective.id === objectiveId;
    }) || axis.objectives[0];
  }

  function activityKey(axisId, objectiveId, activityNumber) {
    return axisId + "::" + objectiveId + "::" + activityNumber;
  }

  function isSaved(state, axisId, objectiveId, activityNumber) {
    return Boolean(state.saved[activityKey(axisId, objectiveId, activityNumber)]);
  }

  function totalActivities() {
    return data.axes.reduce(function (sum, axis) {
      return sum + axis.objectives.reduce(function (objectiveSum, objective) {
        return objectiveSum + objective.activities.length;
      }, 0);
    }, 0);
  }

  function totalObjectives() {
    return data.axes.reduce(function (sum, axis) {
      return sum + axis.objectives.length;
    }, 0);
  }

  function objectiveProgress(axisId, objective, state) {
    const completed = objective.activities.filter(function (activity) {
      return isSaved(state, axisId, objective.id, activity.number);
    }).length;
    const total = objective.activities.length;
    const percent = total ? Math.round((completed / total) * 100) : 0;
    return { completed: completed, total: total, percent: percent };
  }

  function axisProgress(axis, state) {
    const total = axis.objectives.reduce(function (sum, objective) {
      return sum + objective.activities.length;
    }, 0);
    const completed = axis.objectives.reduce(function (sum, objective) {
      return sum + objectiveProgress(axis.id, objective, state).completed;
    }, 0);
    const percent = total ? Math.round((completed / total) * 100) : 0;
    return { completed: completed, total: total, percent: percent };
  }

  function globalProgress(state) {
    const total = totalActivities();
    const completed = Object.values(state.saved).filter(Boolean).length;
    const percent = total ? Math.round((completed / total) * 100) : 0;
    return { completed: completed, total: total, percent: percent };
  }

  function getObjectiveUrl(axisId, objectiveId) {
    return "objectif.html?axe=" + encodeURIComponent(axisId) + "&objectif=" + encodeURIComponent(objectiveId);
  }

  function getActivityUrl(axisId, objectiveId, activityNumber) {
    return "activite.html?axe=" + encodeURIComponent(axisId) + "&objectif=" + encodeURIComponent(objectiveId) + "&activite=" + encodeURIComponent(activityNumber);
  }

  function updateGlobalProgress(state) {
    const progress = globalProgress(state);
    const label = document.getElementById("globalProgressLabel");
    const bar = document.getElementById("globalProgressBar");
    const count = document.getElementById("globalProgressCount");

    if (label) {
      label.textContent = progress.percent + " %";
    }

    if (bar) {
      bar.style.width = progress.percent + "%";
    }

    if (count) {
      count.textContent = progress.completed + " / " + progress.total;
    }
  }

  function updateNavState() {
    const page = document.body.dataset.page;
    const activeHref = {
      home: "index.html",
      objective: "index.html",
      activity: "index.html",
      interactive: "interactif.html",
      team: "equipe.html",
      "resources-theory": "ressources-theoriques.html",
      "resources-class": "ressources-classe.html",
      forum: "forum.html"
    }[page];

    if (!activeHref) {
      return;
    }

    const currentLink = document.querySelector('.topnav-link[href="' + activeHref + '"]');
    if (currentLink) {
      currentLink.classList.add("is-active");
    }
  }

  function objectiveLinksMarkup(axis, state, currentObjectiveId) {
    return axis.objectives.map(function (objective) {
      const progress = objectiveProgress(axis.id, objective, state);
      const currentClass = objective.id === currentObjectiveId ? " objective-link-current" : "";

      return (
        '<a class="objective-link' + currentClass + '" href="' + getObjectiveUrl(axis.id, objective.id) + '">' +
          '<span class="objective-link-label">' + objective.label + "</span>" +
          "<strong>" + objective.title + "</strong>" +
          '<small>' + progress.completed + " / " + progress.total + "</small>" +
        "</a>"
      );
    }).join("");
  }

  function activityNavMarkup(axis, objective, currentActivityNumber) {
    return objective.activities.map(function (activity) {
      const currentClass = activity.number === currentActivityNumber ? " is-current" : "";
      return (
        '<a class="activity-nav-link' + currentClass + '" href="' + getActivityUrl(axis.id, objective.id, activity.number) + '">' +
          "Activité " + activity.number +
        "</a>"
      );
    }).join("");
  }

  function activityStepNavMarkup(axis, objective, currentActivityNumber) {
    return objective.activities.map(function (activity) {
      const currentClass = activity.number === currentActivityNumber ? " is-current" : "";
      return (
        '<a class="activity-nav-link' + currentClass + '" href="' + getActivityUrl(axis.id, objective.id, activity.number) + '">' +
          "Activité " + activity.number +
        "</a>"
      );
    }).join("");
  }

  function objectiveNavMarkup(axis, currentObjectiveId) {
    return axis.objectives.map(function (objective) {
      const currentClass = objective.id === currentObjectiveId ? " is-current" : "";
      return (
        '<a class="activity-nav-link' + currentClass + '" href="' + getObjectiveUrl(axis.id, objective.id) + '">' +
          objective.label +
        "</a>"
      );
    }).join("");
  }

  function activityCardsMarkup(axis, objective, state) {
    return objective.activities.map(function (activity) {
      const saved = isSaved(state, axis.id, objective.id, activity.number);
      const savedClass = saved ? " activity-link-saved" : "";
      return (
        '<a class="activity-link' + savedClass + '" href="' + getActivityUrl(axis.id, objective.id, activity.number) + '">' +
          "<strong>Activité " + activity.number + " : " + activity.title + "</strong>" +
          "<span>" + activity.duration + "</span>" +
        "</a>"
      );
    }).join("");
  }

  function renderInstruction(activity) {
    return activity.instruction || "--";
  }

  function renderFeedbacks(activity) {
    if (!activity.feedbacks || !activity.feedbacks.length) {
      return "--";
    }

    return (
      '<ul class="activity-feedback-list">' +
        activity.feedbacks.map(function (item) {
          return "<li>" + item + "</li>";
        }).join("") +
      "</ul>"
    );
  }

  function renderDefaultActivityContent(activity) {
    return (
      '<div class="content-block">' +
        "<h2>Consigne</h2>" +
        '<div class="activity-copy-box">' + renderInstruction(activity) + "</div>" +
      "</div>" +
      '<div class="content-block">' +
        "<h2>Conseils</h2>" +
        '<div class="activity-copy-box">' + renderFeedbacks(activity) + "</div>" +
      "</div>"
    );
  }

  function renderHome(state) {
    const grid = document.getElementById("axisGrid");
    if (!grid) {
      return;
    }

    grid.innerHTML = data.axes.map(function (axis, index) {
      const progress = axisProgress(axis, state);

      return (
        '<article class="panel axis-card axis-card-' + (index + 1) + '">' +
          '<div class="header-layout">' +
            '<div class="header-copy">' +
              '<div class="axis-head">' +
                "<p>" + axis.shortLabel + "</p>" +
              "</div>" +
              "<h2>" + axis.title + "</h2>" +
            "</div>" +
            '<div class="header-side">' +
              '<div class="meta-grid">' +
                '<article class="meta-card"><span>Durée estimée</span><strong>' + axis.duration + "</strong></article>" +
                '<article class="meta-card"><span>Progression</span><strong>' + progress.percent + ' %</strong></article>' +
              "</div>" +
              '<div class="progress-track" aria-hidden="true"><div class="progress-fill" style="width:' + progress.percent + '%"></div></div>' +
            "</div>" +
          "</div>" +
          '<div class="content-block compact-block">' +
            "<h3>Objectifs</h3>" +
            '<div class="objective-links">' + objectiveLinksMarkup(axis, state, null) + "</div>" +
          "</div>" +
        "</article>"
      );
    }).join("");
  }

  function renderIntro() {
    const axisCount = document.getElementById("introAxisCount");
    const objectiveCount = document.getElementById("introObjectiveCount");
    const activityCount = document.getElementById("introActivityCount");

    if (axisCount) {
      axisCount.textContent = data.axes.length + " axes";
    }

    if (objectiveCount) {
      objectiveCount.textContent = totalObjectives() + " objectifs";
    }

    if (activityCount) {
      activityCount.textContent = totalActivities() + " activités";
    }
  }

  function renderObjective(state) {
    const params = new URLSearchParams(window.location.search);
    const axis = getAxis(params.get("axe"));
    const objective = getObjective(axis, params.get("objectif"));
    const progress = objectiveProgress(axis.id, objective, state);

    const hero = document.getElementById("objectiveHero");
    const list = document.getElementById("objectiveActivityList");
    const subtitle = document.getElementById("pageSubtitle");

    if (subtitle) {
      subtitle.textContent = axis.shortLabel + " · " + objective.label;
    }

    if (hero) {
      hero.classList.add("axis-card-" + (data.axes.indexOf(axis) + 1));
      hero.innerHTML =
        '<div class="header-layout">' +
          '<div class="header-copy">' +
            '<div class="activity-head">' +
              "<p>" + axis.shortLabel + "</p>" +
              "<strong>" + objective.label + "</strong>" +
            "</div>" +
            "<h1>" + objective.title + "</h1>" +
          "</div>" +
          '<div class="header-side">' +
            '<div class="meta-grid">' +
              '<article class="meta-card"><span>Durée estimée</span><strong>' + objective.duration + "</strong></article>" +
              '<article class="meta-card"><span>Progression</span><strong>' + progress.percent + ' %</strong></article>' +
            "</div>" +
            '<div class="progress-track" aria-hidden="true"><div class="progress-fill" style="width:' + progress.percent + '%"></div></div>' +
          "</div>" +
        "</div>" +
        '<div class="nav-stack">' +
          '<div class="activity-nav activity-nav-secondary">' + activityStepNavMarkup(axis, objective, null) + "</div>" +
        "</div>";
    }

    if (list) {
      list.innerHTML = activityCardsMarkup(axis, objective, state);
    }
  }

  function renderActivity(state) {
    const params = new URLSearchParams(window.location.search);
    const axis = getAxis(params.get("axe"));
    const objective = getObjective(axis, params.get("objectif"));
    const requestedNumber = Number(params.get("activite"));
    const activity = objective.activities.find(function (item) {
      return item.number === requestedNumber;
    }) || objective.activities[0];

    const progress = objectiveProgress(axis.id, objective, state);
    const activitySaved = isSaved(state, axis.id, objective.id, activity.number);
    const moduleKey = activityKey(axis.id, objective.id, activity.number);

    const hero = document.getElementById("activityHero");
    const pager = document.getElementById("activityPager");
    const subtitle = document.getElementById("pageSubtitle");
    const content = document.getElementById("activityContent");
    const saveButton = document.getElementById("saveButton");
    const shareButton = document.getElementById("shareButton");
    const printButton = document.getElementById("printButton");

    if (subtitle) {
      subtitle.textContent = axis.shortLabel + " · " + objective.label;
    }

    if (hero) {
      hero.classList.add("axis-card-" + (data.axes.indexOf(axis) + 1));
      hero.innerHTML =
        '<div class="header-layout">' +
          '<div class="header-copy">' +
            '<div class="activity-head">' +
              "<p>" + axis.shortLabel + "</p>" +
              "<strong>" + objective.label + "</strong>" +
            "</div>" +
            "<h1>" + objective.title + "</h1>" +
            '<p class="hero-subtitle">Activité ' + activity.number + "</p>" +
          "</div>" +
          '<div class="header-side">' +
            '<div class="meta-grid">' +
              '<article class="meta-card"><span>Durée estimée</span><strong>' + activity.duration + "</strong></article>" +
              '<article class="meta-card"><span>Progression</span><strong>' + progress.percent + ' %</strong></article>' +
            "</div>" +
            '<div class="progress-track" aria-hidden="true"><div class="progress-fill" style="width:' + progress.percent + '%"></div></div>' +
          "</div>" +
        "</div>" +
        '<div class="nav-stack">' +
          '<div class="activity-nav objective-nav">' + objectiveNavMarkup(axis, objective.id) + "</div>" +
          '<div class="activity-nav activity-nav-secondary">' + activityNavMarkup(axis, objective, activity.number) + "</div>" +
        "</div>";
    }

    if (content) {
      const module = activity.moduleType && window.activityModules ? window.activityModules.get(activity.moduleType) : null;
      content.innerHTML = module ? module.render(activity) : renderDefaultActivityContent(activity);
      if (module && typeof module.init === "function") {
        module.init(content, {
          axis: axis,
          objective: objective,
          activity: activity,
          moduleKey: moduleKey
        });
      }
    }

    if (saveButton) {
      saveButton.textContent = activitySaved ? "Enregistré" : "Enregistrer";
      saveButton.addEventListener("click", function () {
        const currentState = readState();
        const key = activityKey(axis.id, objective.id, activity.number);
        currentState.saved[key] = !currentState.saved[key];
        writeState(currentState);
        window.location.reload();
      });
    }

    if (shareButton) {
      shareButton.addEventListener("click", async function () {
        const shareData = { title: document.title, url: window.location.href };

        try {
          if (navigator.share) {
            await navigator.share(shareData);
          } else if (navigator.clipboard) {
            await navigator.clipboard.writeText(window.location.href);
          }
          flashButton(shareButton, "Partagé");
        } catch (error) {
          flashButton(shareButton, "Partager");
        }
      });
    }

    if (printButton) {
      printButton.addEventListener("click", function () {
        window.print();
      });
    }

    if (pager) {
      const previous = objective.activities.find(function (item) {
        return item.number === activity.number - 1;
      });
      const next = objective.activities.find(function (item) {
        return item.number === activity.number + 1;
      });

      pager.innerHTML =
        (previous
          ? '<a class="btn btn-ghost" href="' + getActivityUrl(axis.id, objective.id, previous.number) + '">Activité précédente</a>'
          : '<span class="inline-nav-placeholder"></span>') +
        '<a class="btn btn-secondary" href="' + getObjectiveUrl(axis.id, objective.id) + '">Retour à l\'objectif</a>' +
        (next
          ? '<a class="btn btn-primary" href="' + getActivityUrl(axis.id, objective.id, next.number) + '">Activité suivante</a>'
          : '<span class="inline-nav-placeholder"></span>');
    }
  }

  function renderTheoryResources() {
    const grid = document.getElementById("resourceTheoryGrid");
    if (!grid) {
      return;
    }

    grid.innerHTML = data.axes.map(function (axis, index) {
      const axisResources = data.theoryResourcesByAxis && data.theoryResourcesByAxis[axis.id];
      const cards = axisResources && axisResources.length
        ? axisResources.map(function (resource) {
            const meta = resource.meta ? "<span>" + resource.meta + "</span>" : "";
            const embed = resource.embed
              ? '<div class="resource-embed"><iframe src="' + resource.embed + '" title="' + resource.type + " · " + resource.title + '" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>'
              : "";

            return (
              '<article class="resource-item resource-item-detailed' + (resource.embed ? " resource-item-video" : "") + '">' +
                "<strong>" + resource.type + " · " + resource.title + "</strong>" +
                "<span>" + resource.description + "</span>" +
                meta +
                embed +
                '<div class="resource-item-actions">' +
                  '<a class="btn btn-ghost" href="' + resource.href + '" target="_blank" rel="noopener noreferrer">' + resource.actionLabel + "</a>" +
                "</div>" +
              "</article>"
            );
          }).join("")
        : data.theoryResourceTypes.map(function (type) {
            return '<article class="resource-item"><strong>' + type + '</strong><span>--</span></article>';
          }).join("");

      return (
        '<section class="panel resource-panel axis-card-' + (index + 1) + '">' +
          '<div class="axis-head"><p>' + axis.shortLabel + "</p></div>" +
          "<h2>" + axis.title + "</h2>" +
          '<div class="resource-stack">' + cards + "</div>" +
        "</section>"
      );
    }).join("");
  }

  function renderClassResources() {
    const grid = document.getElementById("resourceClassGrid");
    if (!grid) {
      return;
    }

    grid.innerHTML = data.axes.map(function (axis, index) {
      const cards = data.classResourceTypes.map(function (type) {
        return '<article class="resource-item"><strong>' + type + '</strong><span>--</span></article>';
      }).join("");

      return (
        '<section class="panel resource-panel axis-card-' + (index + 1) + '">' +
          '<div class="axis-head"><p>' + axis.shortLabel + "</p></div>" +
          "<h2>" + axis.title + "</h2>" +
          '<div class="resource-stack">' + cards + "</div>" +
        "</section>"
      );
    }).join("");
  }

  function renderForum() {
    const grid = document.getElementById("forumGrid");
    if (!grid) {
      return;
    }

    grid.innerHTML = data.axes.map(function (axis, index) {
      return (
        '<article class="panel forum-card axis-card-' + (index + 1) + '">' +
          '<div class="axis-head"><p>' + axis.shortLabel + "</p></div>" +
          "<h2>" + axis.title + "</h2>" +
          '<div class="placeholder-box">--</div>' +
        "</article>"
      );
    }).join("");
  }

  function flashButton(button, text) {
    const original = button.textContent;
    button.textContent = text;
    window.setTimeout(function () {
      button.textContent = original;
    }, 1200);
  }

  function init() {
    const state = readState();
    updateNavState();
    updateGlobalProgress(state);

    switch (document.body.dataset.page) {
      case "intro":
        renderIntro();
        break;
      case "home":
        renderHome(state);
        break;
      case "objective":
        renderObjective(state);
        break;
      case "activity":
        renderActivity(state);
        break;
      case "interactive":
      case "team":
      case "resources-theory":
      case "resources-class":
      case "forum":
        if (document.body.dataset.page === "resources-theory") {
          renderTheoryResources();
        } else if (document.body.dataset.page === "resources-class") {
          renderClassResources();
        } else if (document.body.dataset.page === "forum") {
          renderForum();
        }
        break;
      default:
        break;
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
