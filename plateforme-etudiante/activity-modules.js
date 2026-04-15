(function () {
  const SORT_ITEMS = [
    { id: 1, text: "« Je n’y arriverai jamais. »", category: "verbal", explanation: "L’indice repose ici sur les paroles prononcées par l’élève." },
    { id: 2, text: "L’élève évite le regard et garde les épaules très crispées.", category: "nonverbal", explanation: "Il s’agit de manifestations corporelles directement observables." },
    { id: 3, text: "Une évaluation surprise vient d’être annoncée au début de la leçon.", category: "contextuel", explanation: "Cet élément décrit surtout le contexte immédiat de la situation." },
    { id: 4, text: "L’élève est silencieux pendant quelques secondes.", category: "insuffisant", explanation: "Pris seul, cet élément reste trop vague pour conclure prudemment." },
    { id: 5, text: "« Madame, je vais me tromper. »", category: "verbal", explanation: "L’indice relève des paroles formulées par l’élève." },
    { id: 6, text: "L’élève froisse sa feuille, respire vite et bouge sans cesse sur sa chaise.", category: "nonverbal", explanation: "Ces manifestations observables relèvent du non verbal." },
    { id: 7, text: "Le travail demandé est chronométré et doit être réalisé seul.", category: "contextuel", explanation: "On décrit ici les conditions de la tâche." },
    { id: 8, text: "L’élève porte un pull rouge.", category: "insuffisant", explanation: "Cet élément descriptif n’apporte pas d’indice pertinent de stress." },
    { id: 9, text: "« Je ne comprends plus rien. » dit l’élève d’une voix tremblante.", category: "verbal", explanation: "La parole de l’élève est ici l’indice principal." },
    { id: 10, text: "Ses mains tremblent lorsqu’il prend son cahier.", category: "nonverbal", explanation: "Le tremblement observé relève du non verbal." },
    { id: 11, text: "L’élève doit lire son texte devant toute la classe dans moins d’une minute.", category: "contextuel", explanation: "La situation de passage à l’oral décrit un contexte potentiellement stressant." },
    { id: 12, text: "L’élève regarde par la fenêtre.", category: "insuffisant", explanation: "Ce comportement reste trop ambigu s’il est isolé." },
    { id: 13, text: "« Je veux sortir, s’il vous plaît. »", category: "verbal", explanation: "Il s’agit d’une demande formulée oralement par l’élève." },
    { id: 14, text: "L’élève serre fortement son crayon et garde la mâchoire contractée.", category: "nonverbal", explanation: "Ce sont des signes corporels observables." },
    { id: 15, text: "La consigne a changé au dernier moment et l’élève n’avait pas terminé la précédente.", category: "contextuel", explanation: "L’indice décrit ici une modification de la situation de travail." },
    { id: 16, text: "L’élève est fatigué.", category: "insuffisant", explanation: "L’énoncé est déjà interprétatif et reste insuffisant tel quel." }
  ];

  const SORT_ZONES = [
    { key: "verbal", label: "Verbal", description: "Paroles ou formulation de l’élève." },
    { key: "nonverbal", label: "Non verbal", description: "Posture, gestes, ton, rythme." },
    { key: "contextuel", label: "Contextuel", description: "Situation, tâche, cadre, événement." },
    { key: "insuffisant", label: "Insuffisant", description: "Indice trop vague ou trop isolé." }
  ];

  const VERBATIM_EXERCISES = [
    {
      id: "ex1",
      title: "Exercice 1",
      type: "Dialogue",
      description: "Identifier les signes verbaux de tension chez l’élève et les formulations qui augmentent la pression lors d’un passage oral.",
      transcript: [
        { speaker: "Enseignante", segments: [{ id: "ex1_s1", text: "Bon, on se dépêche," }, { id: "ex1_s2", text: "dans une minute tu lis ton texte devant toute la classe." }] },
        { speaker: "Élève", segments: [{ id: "ex1_s3", text: "Je... je ne suis pas prêt." }, { id: "ex1_s4", text: "J’ai peur de me tromper." }] },
        { speaker: "Enseignante", segments: [{ id: "ex1_s5", text: "Tu as déjà eu assez de temps." }, { id: "ex1_s6", text: "Les autres y arrivent bien, toi aussi." }] },
        { speaker: "Élève", segments: [{ id: "ex1_s7", text: "Je ne comprends plus trop." }, { id: "ex1_s8", text: "Est-ce que je peux passer après ?" }] },
        { speaker: "Enseignante", segments: [{ id: "ex1_s9", text: "Non, maintenant." }, { id: "ex1_s10", text: "Sinon tu vas encore retarder tout le groupe." }] },
        { speaker: "Élève", segments: [{ id: "ex1_s11", text: "D’accord..." }, { id: "ex1_s12", text: "mais j’ai mal au ventre." }] }
      ],
      correction: {
        stress: ["ex1_s3", "ex1_s4", "ex1_s7", "ex1_s8", "ex1_s12"],
        pressure: ["ex1_s1", "ex1_s2", "ex1_s5", "ex1_s6", "ex1_s9", "ex1_s10"]
      },
      comments: {
        ex1_s1: "La formulation crée un climat d’urgence.",
        ex1_s2: "L’exposition immédiate devant la classe augmente la pression.",
        ex1_s3: "Dire ne pas être prêt est un indice défendable de tension.",
        ex1_s4: "L’élève verbalise explicitement une crainte de l’échec.",
        ex1_s5: "Cette réponse peut être vécue comme peu contenante.",
        ex1_s6: "La comparaison avec les autres renforce la pression de performance.",
        ex1_s7: "Cette formulation peut signaler une désorganisation sous pression.",
        ex1_s8: "La demande de passer plus tard peut indiquer un évitement lié au stress.",
        ex1_s9: "Le refus abrupt laisse peu d’espace de régulation.",
        ex1_s10: "La référence au groupe ajoute une pression sociale.",
        ex1_s12: "Le mal au ventre peut être un signe somatique associé au stress."
      }
    },
    {
      id: "ex2",
      title: "Exercice 2",
      type: "Narration",
      description: "Repérer, dans une narration de classe, les éléments signalant le stress d’un élève et ceux qui intensifient la pression liée à la tâche.",
      transcript: [
        { speaker: "Narration", narration: true, segments: [{ id: "ex2_s1", text: "En début d’évaluation, l’enseignant annonce qu’il ne restera pas une minute de plus à la fin." }, { id: "ex2_s2", text: "Il précise aussi que les copies incomplètes seront notées comme telles." }] },
        { speaker: "Narration", narration: true, segments: [{ id: "ex2_s3", text: "Au troisième exercice, Léo relit plusieurs fois la consigne sans écrire." }, { id: "ex2_s4", text: "Il souffle, serre très fort son stylo et demande s’il peut recommencer depuis le début." }] },
        { speaker: "Narration", narration: true, segments: [{ id: "ex2_s5", text: "L’enseignant répond à voix haute que ce n’est pourtant pas difficile." }, { id: "ex2_s6", text: "Il ajoute que les élèves qui ont bien révisé ont déjà presque terminé." }] },
        { speaker: "Narration", narration: true, segments: [{ id: "ex2_s7", text: "Léo baisse la tête, efface plusieurs fois la même ligne et dit qu’il ne sait plus comment commencer." }, { id: "ex2_s8", text: "Quelques minutes plus tard, il demande s’il peut aller boire un verre d’eau." }] }
      ],
      correction: {
        stress: ["ex2_s3", "ex2_s4", "ex2_s7", "ex2_s8"],
        pressure: ["ex2_s1", "ex2_s2", "ex2_s5", "ex2_s6"]
      },
      comments: {
        ex2_s1: "La limite de temps annoncée de façon ferme peut accroître la pression.",
        ex2_s2: "La menace de sanction sur les copies incomplètes renforce la tension.",
        ex2_s3: "La relecture répétée sans passage à l’écriture peut signaler un blocage.",
        ex2_s4: "Les manifestations corporelles et la demande de recommencer vont dans le sens d’une forte tension.",
        ex2_s5: "Cette réponse minimise la difficulté ressentie.",
        ex2_s6: "La comparaison implicite avec les autres ajoute une pression sociale.",
        ex2_s7: "L’effacement répété et la verbalisation d’un désarroi constituent des indices pertinents.",
        ex2_s8: "La demande de s’éloigner brièvement peut être un indice de besoin de régulation."
      }
    },
    {
      id: "ex3",
      title: "Exercice 3",
      type: "Dialogue",
      description: "Distinguer ce qui relève du stress de l’élève et ce qui, dans le discours de l’adulte, accentue la pression dans un contexte collectif.",
      transcript: [
        { speaker: "Enseignant", segments: [{ id: "ex3_s1", text: "Votre groupe passe en premier," }, { id: "ex3_s2", text: "j’attends quelque chose de clair et sans hésitation." }] },
        { speaker: "Élève", segments: [{ id: "ex3_s3", text: "Je préfère peut-être laisser Emma parler au début." }, { id: "ex3_s4", text: "Je sens que je vais tout mélanger." }] },
        { speaker: "Enseignant", segments: [{ id: "ex3_s5", text: "Non, tu dois prendre ta part comme les autres." }, { id: "ex3_s6", text: "Ce n’est pas le moment d’avoir peur." }] },
        { speaker: "Élève", segments: [{ id: "ex3_s7", text: "Mon cœur bat très vite." }, { id: "ex3_s8", text: "Est-ce qu’on peut répéter encore une fois ?" }] },
        { speaker: "Enseignant", segments: [{ id: "ex3_s9", text: "On n’a plus le temps." }, { id: "ex3_s10", text: "Tout le monde vous regarde déjà." }] }
      ],
      correction: {
        stress: ["ex3_s3", "ex3_s4", "ex3_s7", "ex3_s8"],
        pressure: ["ex3_s1", "ex3_s2", "ex3_s5", "ex3_s6", "ex3_s9", "ex3_s10"]
      },
      comments: {
        ex3_s1: "Le passage en premier peut créer une pression supplémentaire.",
        ex3_s2: "L’exigence formulée sur un mode normatif augmente l’enjeu perçu.",
        ex3_s3: "Le souhait de laisser un autre élève commencer peut signaler une tension.",
        ex3_s4: "L’élève anticipe un échec ou une désorganisation.",
        ex3_s5: "La formulation injonctive laisse peu d’espace d’ajustement.",
        ex3_s6: "Minimiser la peur exprimée peut accroître la pression ressentie.",
        ex3_s7: "La verbalisation d’un signe physiologique constitue un indice solide.",
        ex3_s8: "La demande de répétition peut signaler un besoin de sécurisation.",
        ex3_s9: "L’urgence temporelle peut faire monter la pression.",
        ex3_s10: "La mise en avant du regard du groupe accentue l’exposition sociale."
      }
    },
    {
      id: "ex4",
      title: "Exercice 4",
      type: "Narration",
      description: "Analyser une scène racontée pour repérer des indices de surcharge et des éléments qui intensifient la pression.",
      transcript: [
        { speaker: "Narration", narration: true, segments: [{ id: "ex4_s1", text: "Alors que les élèves pensent avoir terminé leur affiche, l’enseignante annonce qu’il faut tout reprendre sous une autre forme." }, { id: "ex4_s2", text: "Elle précise que le travail sera présenté devant la direction en fin de matinée." }] },
        { speaker: "Narration", narration: true, segments: [{ id: "ex4_s3", text: "Nina reste immobile quelques secondes, regarde son brouillon puis murmure qu’elle ne va pas y arriver." }, { id: "ex4_s4", text: "Elle relit plusieurs fois les nouvelles consignes sans parler à son groupe." }] },
        { speaker: "Narration", narration: true, segments: [{ id: "ex4_s5", text: "L’enseignante répète qu’il faut faire vite et que ce n’est pas compliqué." }, { id: "ex4_s6", text: "Elle rappelle aussi que les groupes les plus efficaces passeront en premier." }] },
        { speaker: "Narration", narration: true, segments: [{ id: "ex4_s7", text: "Nina finit par demander si quelqu’un peut lui redire calmement ce qu’il faut faire." }, { id: "ex4_s8", text: "Quand vient le moment de s’organiser, elle dit qu’elle a la tête vide." }] }
      ],
      correction: {
        stress: ["ex4_s3", "ex4_s4", "ex4_s7", "ex4_s8"],
        pressure: ["ex4_s1", "ex4_s2", "ex4_s5", "ex4_s6"]
      },
      comments: {
        ex4_s1: "Le changement tardif de consigne constitue une source de pression contextuelle.",
        ex4_s2: "La perspective d’une présentation devant la direction augmente l’enjeu.",
        ex4_s3: "La verbalisation d’un sentiment d’incapacité est un indice pertinent.",
        ex4_s4: "La relecture répétée et le retrait relationnel peuvent signaler une surcharge.",
        ex4_s5: "Le rappel de la vitesse attendu, associé à une minimisation de la difficulté, peut majorer la tension.",
        ex4_s6: "La mise en concurrence implicite des groupes accentue la pression.",
        ex4_s7: "La demande d’une reformulation calme peut traduire un besoin de régulation.",
        ex4_s8: "Dire avoir la tête vide peut indiquer un blocage sous pression."
      }
    }
  ];

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function readStorage(key, fallback) {
    try {
      const parsed = JSON.parse(window.localStorage.getItem(key));
      return parsed && typeof parsed === "object" ? parsed : clone(fallback);
    } catch (error) {
      return clone(fallback);
    }
  }

  function writeStorage(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  function makeKey(context) {
    return "adid-activity-module::" + context.moduleKey;
  }

  function pluralize(count, singular, plural) {
    return count > 1 ? plural : singular;
  }

  function setFlashMessage(node, text) {
    if (!node) {
      return;
    }
    node.textContent = text;
    node.classList.add("is-visible");
    window.clearTimeout(setFlashMessage._timer);
    setFlashMessage._timer = window.setTimeout(function () {
      node.textContent = "";
      node.classList.remove("is-visible");
    }, 1600);
  }

  function renderSortModule() {
    const zonesMarkup = SORT_ZONES.map(function (zone) {
      return (
        '<section class="sort-zone" data-sort-zone="' + zone.key + '">' +
          '<div class="sort-zone-title">' + zone.label + "</div>" +
          '<div class="sort-drop-list" id="sortZone-' + zone.key + '"></div>' +
        "</section>"
      );
    }).join("");

    return (
      '<div class="activity-module">' +
        '<section class="module-note-grid">' +
          '<article class="module-note">' +
            "<h2>Consigne</h2>" +
            "<p>Classez chaque carte dans la bonne catégorie : verbal, non verbal, contextuel ou insuffisant pour conclure.</p>" +
          "</article>" +
          '<article class="module-note">' +
            "<h2>Conseils</h2>" +
            '<ul class="module-note-list">' +
              "<li>Restez sur l’observable.</li>" +
              "<li>Ne concluez pas trop vite à partir d’un seul indice.</li>" +
              "<li>Validez ensuite pour obtenir le feedback.</li>" +
            "</ul>" +
          "</article>" +
        "</section>" +
        '<section class="module-panel">' +
          '<div class="module-panel-head">' +
            "<div>" +
              "<h2>Carte à classer</h2>" +
              "<p>Une carte à la fois pour garder l’attention sur l’item en cours.</p>" +
            "</div>" +
            '<strong class="module-kpi" id="sortRemainingPill">16 cartes restantes</strong>' +
          "</div>" +
          '<div class="sort-current-wrap" id="sortCurrentCardWrap"></div>' +
          '<div class="module-inline-actions">' +
            '<button class="btn btn-secondary" type="button" id="sortSkipBtn">Passer cette carte</button>' +
            '<button class="btn btn-ghost" type="button" id="sortShuffleBtn">Mélanger les cartes restantes</button>' +
          "</div>" +
        "</section>" +
        '<section class="module-panel">' +
          '<div class="module-panel-head">' +
            "<div>" +
              "<h2>Tableau de classement</h2>" +
              "<p>Les quatre catégories restent visibles en même temps.</p>" +
            "</div>" +
            '<div class="module-progress-inline">' +
              '<strong id="sortProgressText">0 / 16 placés</strong>' +
              '<div class="progress-track" aria-hidden="true"><div class="progress-fill" id="sortProgressBar"></div></div>' +
            "</div>" +
          "</div>" +
          '<div class="sort-zone-grid">' + zonesMarkup + "</div>" +
          '<div class="module-actions">' +
            '<button class="btn btn-primary" type="button" id="sortValidateBtn">Valider mes réponses</button>' +
            '<button class="btn btn-secondary" type="button" id="sortCorrectionBtn">Afficher la correction</button>' +
            '<button class="btn btn-ghost" type="button" id="sortResetBtn">Réinitialiser</button>' +
          "</div>" +
        "</section>" +
        '<section class="module-panel module-result-panel">' +
          '<div class="module-panel-head">' +
            "<div>" +
              "<h2>Résultat</h2>" +
            "</div>" +
            '<span class="module-status-badge" id="sortResultBadge">En attente</span>' +
          "</div>" +
          '<p class="module-result-text" id="sortResultText">Classez les 16 cartes, puis validez pour afficher le résultat.</p>' +
          '<p class="module-result-note" id="sortResultNote"></p>' +
        "</section>" +
      "</div>"
    );
  }

  function initSortModule(root, context) {
    const storageKey = makeKey(context);
    const defaultState = { deck: [], placements: {}, validated: false, correctionShown: false };
    const state = readStorage(storageKey, defaultState);

    const currentCardWrap = root.querySelector("#sortCurrentCardWrap");
    const remainingPill = root.querySelector("#sortRemainingPill");
    const progressText = root.querySelector("#sortProgressText");
    const progressBar = root.querySelector("#sortProgressBar");
    const resultBadge = root.querySelector("#sortResultBadge");
    const resultText = root.querySelector("#sortResultText");
    const resultNote = root.querySelector("#sortResultNote");

    function persist() {
      writeStorage(storageKey, state);
    }

    function shuffleArray(array) {
      const copy = array.slice();
      for (let index = copy.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        const value = copy[index];
        copy[index] = copy[swapIndex];
        copy[swapIndex] = value;
      }
      return copy;
    }

    function resetState() {
      state.deck = shuffleArray(SORT_ITEMS.map(function (item) { return item.id; }));
      state.placements = {};
      state.validated = false;
      state.correctionShown = false;
      persist();
    }

    function getItemById(id) {
      return SORT_ITEMS.find(function (item) {
        return item.id === id;
      });
    }

    function getCurrentItem() {
      return getItemById(state.deck[0]);
    }

    function countPlaced(zoneKey) {
      return SORT_ITEMS.filter(function (item) {
        return state.placements[item.id] === zoneKey;
      }).length;
    }

    function placeCurrentCard(zoneKey) {
      const currentId = state.deck.shift();
      if (!currentId) {
        return;
      }
      state.placements[currentId] = zoneKey;
      state.validated = false;
      state.correctionShown = false;
      persist();
      renderAll();
    }

    function removePlacement(id) {
      delete state.placements[id];
      state.deck.unshift(id);
      state.validated = false;
      state.correctionShown = false;
      persist();
      renderAll();
    }

    function renderCurrentCard() {
      const currentItem = getCurrentItem();
      const remaining = state.deck.length;
      remainingPill.textContent = remaining > 0
        ? remaining + " " + pluralize(remaining, "carte restante", "cartes restantes")
        : "Toutes les cartes sont placées";

      currentCardWrap.innerHTML = "";

      if (!currentItem) {
        const empty = document.createElement("div");
        empty.className = "sort-empty-card";
        empty.textContent = "La pioche est terminée. Vous pouvez maintenant valider ou revoir vos colonnes.";
        currentCardWrap.appendChild(empty);
        return;
      }

      const card = document.createElement("article");
      card.className = "sort-current-card";
      card.draggable = true;
      card.dataset.id = String(currentItem.id);

      const text = document.createElement("p");
      text.textContent = currentItem.text;
      card.appendChild(text);

      card.addEventListener("dragstart", function (event) {
        event.dataTransfer.setData("text/plain", String(currentItem.id));
        card.classList.add("is-dragging");
      });

      card.addEventListener("dragend", function () {
        card.classList.remove("is-dragging");
      });

      currentCardWrap.appendChild(card);
    }

    function renderDropZones() {
      SORT_ZONES.forEach(function (zone) {
        const container = root.querySelector("#sortZone-" + zone.key);
        const items = SORT_ITEMS.filter(function (item) {
          return state.placements[item.id] === zone.key;
        });

        container.innerHTML = "";

        if (!items.length) {
          const empty = document.createElement("div");
          empty.className = "sort-drop-placeholder";
          empty.textContent = "Déposez ici les cartes correspondantes.";
          container.appendChild(empty);
          return;
        }

        items.forEach(function (item) {
          const card = document.createElement("article");
          card.className = "sort-placed-card";

          const top = document.createElement("div");
          top.className = "sort-placed-top";

          const reset = document.createElement("button");
          reset.type = "button";
          reset.className = "sort-remove-btn";
          reset.textContent = "↺";
          reset.title = "Retirer cette carte";
          reset.addEventListener("click", function () {
            removePlacement(item.id);
          });

          top.appendChild(reset);
          card.appendChild(top);

          const label = document.createElement("p");
          label.textContent = item.text;
          card.appendChild(label);

          if (state.validated) {
            const feedback = document.createElement("div");
            const isCorrect = state.placements[item.id] === item.category;
            feedback.className = "sort-feedback" + (isCorrect ? " is-correct" : " is-warning");
            feedback.textContent = isCorrect
              ? "Correct. " + item.explanation
              : "À revoir. La bonne catégorie est « " + SORT_ZONES.find(function (zoneItem) { return zoneItem.key === item.category; }).label + " ». " + item.explanation;
            card.appendChild(feedback);
            card.classList.add(isCorrect ? "is-correct" : "is-warning");
          }

          container.appendChild(card);
        });
      });
    }

    function renderProgress() {
      const placed = Object.keys(state.placements).length;
      const correct = SORT_ITEMS.filter(function (item) {
        return state.placements[item.id] === item.category;
      }).length;
      const percent = Math.round((placed / SORT_ITEMS.length) * 100);

      progressText.textContent = placed + " / " + SORT_ITEMS.length + " placés";
      progressBar.style.width = percent + "%";

      if (state.correctionShown) {
        resultBadge.textContent = "Correction affichée";
        resultBadge.className = "module-status-badge is-success";
        resultText.textContent = "Toutes les cartes ont été replacées dans la bonne catégorie.";
        resultNote.textContent = "Observez maintenant la logique de classement et le feedback associé à chaque carte.";
        return;
      }

      if (state.validated) {
        if (placed < SORT_ITEMS.length) {
          resultBadge.textContent = "Validation partielle";
          resultBadge.className = "module-status-badge is-warning";
          resultText.textContent = "Vous avez " + correct + " bonne" + (correct > 1 ? "s" : "") + " réponse" + (correct > 1 ? "s" : "") + " pour l’instant. Certaines cartes ne sont pas encore classées.";
          resultNote.textContent = "Terminez le classement pour obtenir le résultat complet.";
          return;
        }

        const success = correct >= 13;
        resultBadge.textContent = success ? "Critère atteint" : "À renforcer";
        resultBadge.className = "module-status-badge " + (success ? "is-success" : "is-warning");
        resultText.textContent = "Score : " + correct + " / 16.";
        resultNote.textContent = success
          ? "Le critère attendu est atteint."
          : "Le critère attendu est de 13 bonnes réponses sur 16.";
        return;
      }

      if (placed > 0) {
        resultBadge.textContent = "Tri en cours";
        resultBadge.className = "module-status-badge";
        resultText.textContent = "Votre classement a été modifié. Validez pour afficher le feedback.";
        resultNote.textContent = "";
        return;
      }

      resultBadge.textContent = "En attente";
      resultBadge.className = "module-status-badge";
      resultText.textContent = "Classez les 16 cartes, puis validez pour afficher le résultat.";
      resultNote.textContent = "";
    }

    function renderAll() {
      renderCurrentCard();
      renderDropZones();
      renderProgress();
    }

    function validate() {
      state.validated = true;
      state.correctionShown = false;
      persist();
      renderAll();
    }

    function showCorrection() {
      state.deck = [];
      SORT_ITEMS.forEach(function (item) {
        state.placements[item.id] = item.category;
      });
      state.validated = true;
      state.correctionShown = true;
      persist();
      renderAll();
    }

    function skipCurrentCard() {
      if (state.deck.length <= 1) {
        return;
      }
      const first = state.deck.shift();
      state.deck.push(first);
      persist();
      renderAll();
    }

    function shuffleDeck() {
      state.deck = shuffleArray(state.deck);
      persist();
      renderAll();
    }

    if (!Array.isArray(state.deck) || (!state.deck.length && !Object.keys(state.placements || {}).length && !state.validated)) {
      resetState();
    }

    root.querySelectorAll("[data-sort-zone]").forEach(function (zoneNode) {
      zoneNode.addEventListener("click", function (event) {
        if (event.target.closest(".sort-remove-btn") || event.target.closest(".sort-placed-card")) {
          return;
        }
        if (!getCurrentItem()) {
          return;
        }
        placeCurrentCard(zoneNode.dataset.sortZone);
      });

      zoneNode.addEventListener("dragover", function (event) {
        event.preventDefault();
        zoneNode.classList.add("is-over");
      });

      zoneNode.addEventListener("dragleave", function () {
        zoneNode.classList.remove("is-over");
      });

      zoneNode.addEventListener("drop", function (event) {
        event.preventDefault();
        zoneNode.classList.remove("is-over");
        const draggedId = Number(event.dataTransfer.getData("text/plain"));
        const currentItem = getCurrentItem();
        if (!currentItem || currentItem.id !== draggedId) {
          return;
        }
        placeCurrentCard(zoneNode.dataset.sortZone);
      });
    });

    root.querySelector("#sortSkipBtn").addEventListener("click", skipCurrentCard);
    root.querySelector("#sortShuffleBtn").addEventListener("click", shuffleDeck);
    root.querySelector("#sortValidateBtn").addEventListener("click", validate);
    root.querySelector("#sortCorrectionBtn").addEventListener("click", showCorrection);
    root.querySelector("#sortResetBtn").addEventListener("click", function () {
      if (!window.confirm("Réinitialiser cette activité ?")) {
        return;
      }
      resetState();
      renderAll();
    });

    renderAll();
  }

  function renderPrepModule() {
    return (
      '<div class="activity-module">' +
        '<section class="module-note-grid">' +
          '<article class="module-note">' +
            "<h2>Consigne</h2>" +
            "<p>Décrivez une situation réelle, relevez des indices observables, formulez une hypothèse prudente puis revenez sur votre propre posture.</p>" +
          "</article>" +
          '<article class="module-note">' +
            "<h2>Repère</h2>" +
            "<p>Les réponses sont sauvegardées localement au fil de l’écriture.</p>" +
          "</article>" +
        "</section>" +
        '<section class="module-form-grid">' +
          '<article class="module-panel">' +
            '<div class="module-panel-head"><div><h2>1. Observation situation de classe</h2><p>Décrivez les faits observables avant d’interpréter.</p></div></div>' +
            '<div class="module-fields">' +
              '<div class="field-row-two">' +
                '<div class="module-field"><label for="prepClasse">Classe / niveau</label><input id="prepClasse" data-prep-field="classe" type="text" placeholder="Ex. 7H, français" /></div>' +
                '<div class="module-field"><label for="prepMoment">Moment ou activité</label><input id="prepMoment" data-prep-field="moment" type="text" placeholder="Ex. travail individuel" /></div>' +
              "</div>" +
              '<div class="module-field"><label for="prepContexte">Contexte</label><textarea id="prepContexte" data-prep-field="contexte" placeholder="Décrivez le contexte de manière factuelle."></textarea></div>' +
              '<div class="module-field"><label for="prepSituation">Situation vécue</label><textarea id="prepSituation" data-prep-field="situation" placeholder="Racontez la scène en quelques lignes."></textarea></div>' +
              '<div class="field-row-two">' +
                '<div class="module-field"><label for="prepVerbal1">Indice verbal 1</label><input id="prepVerbal1" data-prep-field="verbal1" type="text" placeholder="Ex. « Je n’y arriverai pas. »" /></div>' +
                '<div class="module-field"><label for="prepVerbal2">Indice verbal 2</label><input id="prepVerbal2" data-prep-field="verbal2" type="text" placeholder="Ajoutez un second indice verbal." /></div>' +
              "</div>" +
              '<div class="field-row-two">' +
                '<div class="module-field"><label for="prepNonverbal1">Indice non verbal ou contextuel 1</label><input id="prepNonverbal1" data-prep-field="nonverbal1" type="text" placeholder="Ex. évite le regard" /></div>' +
                '<div class="module-field"><label for="prepNonverbal2">Indice non verbal ou contextuel 2</label><input id="prepNonverbal2" data-prep-field="nonverbal2" type="text" placeholder="Ajoutez un second indice observable." /></div>' +
              "</div>" +
              '<div class="module-field"><label for="prepHypothese">Hypothèse prudente</label><textarea id="prepHypothese" data-prep-field="hypothese" placeholder="Ex. Je fais l’hypothèse que..."></textarea></div>' +
            "</div>" +
          "</article>" +
          '<article class="module-panel module-panel-soft">' +
            '<div class="module-panel-head"><div><h2>2. Analyse de posture</h2><p>Reliez l’analyse de la situation à votre réaction professionnelle.</p></div></div>' +
            '<div class="module-fields">' +
              '<div class="module-field"><label for="prepFeltMoment">Qu’as-tu ressenti à ce moment-là ?</label><textarea id="prepFeltMoment" data-prep-field="feltMoment" placeholder="Ex. tension, incertitude, sentiment d’urgence..."></textarea></div>' +
              '<div class="module-field"><label for="prepTeacherReaction">Comment as-tu réagi ?</label><textarea id="prepTeacherReaction" data-prep-field="teacherReaction" placeholder="Ex. j’ai reformulé, rassuré, maintenu la consigne..."></textarea></div>' +
              '<div class="module-field"><label for="prepTeacherReview">Que penses-tu de ton retour ?</label><textarea id="prepTeacherReview" data-prep-field="teacherReview" placeholder="Ex. avec du recul, mon retour..."></textarea></div>' +
            "</div>" +
            '<div class="module-actions">' +
              '<button class="btn btn-ghost" type="button" id="prepResetBtn">Réinitialiser la fiche</button>' +
              '<span class="module-inline-note" id="prepFlashNote"></span>' +
            "</div>" +
          "</article>" +
        "</section>" +
      "</div>"
    );
  }

  function initPrepModule(root, context) {
    const storageKey = makeKey(context);
    const flashNote = root.querySelector("#prepFlashNote");
    const fields = Array.from(root.querySelectorAll("[data-prep-field]"));
    let debounceId = null;

    function getData() {
      const result = {};
      fields.forEach(function (field) {
        result[field.dataset.prepField] = field.value;
      });
      return result;
    }

    function save() {
      writeStorage(storageKey, getData());
    }

    function load() {
      const saved = readStorage(storageKey, {});
      fields.forEach(function (field) {
        field.value = saved[field.dataset.prepField] || "";
      });
    }

    fields.forEach(function (field) {
      field.addEventListener("input", function () {
        window.clearTimeout(debounceId);
        debounceId = window.setTimeout(save, 180);
      });
      field.addEventListener("change", save);
    });

    window.addEventListener("beforeunload", save);

    root.querySelector("#prepResetBtn").addEventListener("click", function () {
      if (!window.confirm("Réinitialiser cette fiche ?")) {
        return;
      }
      fields.forEach(function (field) {
        field.value = "";
      });
      save();
      setFlashMessage(flashNote, "Fiche réinitialisée.");
    });

    load();
  }

  function renderVerbatimModule() {
    return (
      '<div class="activity-module">' +
        '<section class="module-note-grid module-note-grid-single">' +
          '<article class="module-note">' +
            "<h2>Consigne</h2>" +
            "<p>selectionne le bon mode et surligne les passages dans le texte.</p>" +
          "</article>" +
        "</section>" +
        '<section class="module-panel">' +
          '<div class="module-panel-head">' +
            "<div>" +
              '<h2 id="verbatimExerciseTitle">Exercice 1</h2>' +
              '<p id="verbatimExerciseMeta">Dialogue</p>' +
              '<p id="verbatimExerciseDescription"></p>' +
            "</div>" +
            '<div class="module-inline-actions">' +
              '<span class="module-kpi" id="verbatimExerciseCounter">Exercice 1 / 4</span>' +
              '<button class="btn btn-ghost" type="button" id="verbatimPrevBtn">Précédent</button>' +
              '<button class="btn btn-ghost" type="button" id="verbatimNextBtn">Suivant</button>' +
            "</div>" +
          "</div>" +
        "</section>" +
        '<section class="module-panel">' +
          '<div class="module-toolbar">' +
            '<div class="module-mode-row">' +
              '<button class="btn btn-ghost module-mode-btn" type="button" data-verbatim-mode="stress">Stress probable</button>' +
              '<button class="btn btn-ghost module-mode-btn" type="button" data-verbatim-mode="pressure">Formulation stressante</button>' +
            "</div>" +
          "</div>" +
        "</section>" +
        '<section class="module-panel">' +
          '<div class="verbatim-transcript" id="verbatimTranscript"></div>' +
        "</section>" +
        '<section class="module-panel module-result-panel">' +
          '<div class="module-panel-head">' +
            "<div><h2>Résultat</h2></div>" +
            '<span class="module-status-badge" id="verbatimResultBadge">En attente</span>' +
          "</div>" +
          '<p class="module-result-text" id="verbatimResultText">Annotez le texte, puis validez.</p>' +
          '<div class="module-feedback-list" id="verbatimFeedbackList"></div>' +
          '<p class="module-result-note" id="verbatimResultNote"></p>' +
          '<div class="module-actions">' +
            '<button class="btn btn-primary" type="button" id="verbatimValidateBtn">Valider mes réponses</button>' +
            '<button class="btn btn-secondary" type="button" id="verbatimCorrectionBtn">Afficher la correction</button>' +
            '<button class="btn btn-ghost" type="button" id="verbatimResetBtn">Réinitialiser cet exercice</button>' +
          "</div>" +
        "</section>" +
      "</div>"
    );
  }

  function initVerbatimModule(root, context) {
    const storageKey = makeKey(context);
    const defaultState = {
      exerciseIndex: 0,
      currentMode: null,
      selectionsByExercise: {},
      validatedByExercise: {},
      correctionShownByExercise: {}
    };
    const state = readStorage(storageKey, defaultState);
    if (state.currentMode !== "stress" && state.currentMode !== "pressure") {
      state.currentMode = null;
    }

    const exerciseTitle = root.querySelector("#verbatimExerciseTitle");
    const exerciseMeta = root.querySelector("#verbatimExerciseMeta");
    const exerciseDescription = root.querySelector("#verbatimExerciseDescription");
    const exerciseCounter = root.querySelector("#verbatimExerciseCounter");
    const transcript = root.querySelector("#verbatimTranscript");
    const resultBadge = root.querySelector("#verbatimResultBadge");
    const resultText = root.querySelector("#verbatimResultText");
    const feedbackList = root.querySelector("#verbatimFeedbackList");
    const resultNote = root.querySelector("#verbatimResultNote");
    const prevBtn = root.querySelector("#verbatimPrevBtn");
    const nextBtn = root.querySelector("#verbatimNextBtn");

    function persist() {
      writeStorage(storageKey, state);
    }

    function currentExercise() {
      return VERBATIM_EXERCISES[state.exerciseIndex];
    }

    function currentSelections() {
      const exercise = currentExercise();
      if (!state.selectionsByExercise[exercise.id]) {
        state.selectionsByExercise[exercise.id] = {};
      }
      return state.selectionsByExercise[exercise.id];
    }

    function isValidated() {
      return Boolean(state.validatedByExercise[currentExercise().id]);
    }

    function isCorrectionShown() {
      return Boolean(state.correctionShownByExercise[currentExercise().id]);
    }

    function setMode(mode) {
      state.currentMode = mode;
      root.querySelectorAll("[data-verbatim-mode]").forEach(function (button) {
        button.classList.toggle("is-active", button.dataset.verbatimMode === mode);
      });
      persist();
    }

    function renderHeader() {
      const exercise = currentExercise();
      exerciseTitle.textContent = exercise.title;
      exerciseMeta.textContent = exercise.type;
      exerciseDescription.textContent = exercise.description;
      exerciseCounter.textContent = "Exercice " + (state.exerciseIndex + 1) + " / " + VERBATIM_EXERCISES.length;
      prevBtn.disabled = state.exerciseIndex === 0;
      nextBtn.disabled = state.exerciseIndex === VERBATIM_EXERCISES.length - 1;
    }

    function renderTranscript() {
      const exercise = currentExercise();
      const selections = currentSelections();
      const stressSet = new Set(exercise.correction.stress);
      const pressureSet = new Set(exercise.correction.pressure);
      const validated = isValidated();
      const correctionShown = isCorrectionShown();

      transcript.innerHTML = "";

      exercise.transcript.forEach(function (turn) {
        const line = document.createElement("p");
        line.className = "verbatim-line";

        const speakerNode = document.createElement("strong");
        speakerNode.className = "verbatim-inline-speaker" + (turn.narration ? " is-narration" : "");
        speakerNode.textContent = turn.speaker + " :";
        line.appendChild(speakerNode);
        line.appendChild(document.createTextNode(" "));

        turn.segments.forEach(function (segment) {
          const segmentNode = document.createElement("span");
          const selection = selections[segment.id];
          segmentNode.className = "verbatim-segment";
          segmentNode.textContent = segment.text;

          if (selection === "stress") {
            segmentNode.classList.add("is-selected-stress");
          }
          if (selection === "pressure") {
            segmentNode.classList.add("is-selected-pressure");
          }

          if (validated) {
            const correctChoice = stressSet.has(segment.id) ? "stress" : pressureSet.has(segment.id) ? "pressure" : null;

            if (selection && correctChoice && selection === correctChoice) {
              segmentNode.classList.add(correctChoice === "stress" ? "is-correct-stress" : "is-correct-pressure");
            } else if (selection && selection !== correctChoice) {
              segmentNode.classList.add("is-wrong");
            } else if (!selection && correctChoice) {
              segmentNode.classList.add(correctionShown ? "is-correction" : "is-missed");
            }
          }

          segmentNode.addEventListener("click", function () {
            if (isValidated() || !state.currentMode) {
              return;
            }
            if (selection === state.currentMode) {
              delete selections[segment.id];
            } else {
              selections[segment.id] = state.currentMode;
            }
            state.validatedByExercise[exercise.id] = false;
            state.correctionShownByExercise[exercise.id] = false;
            persist();
            renderAll();
          });

          line.appendChild(segmentNode);
          line.appendChild(document.createTextNode(" "));
        });

        transcript.appendChild(line);
      });
    }

    function clearResult() {
      resultBadge.textContent = "En attente";
      resultBadge.className = "module-status-badge";
      resultText.textContent = "Annotez le texte, puis validez.";
      feedbackList.innerHTML = "";
      resultNote.textContent = "";
    }

    function renderValidatedResult(showCorrection) {
      const exercise = currentExercise();
      const selections = currentSelections();
      const stressSet = new Set(exercise.correction.stress);
      const pressureSet = new Set(exercise.correction.pressure);
      const allCorrectIds = new Set(exercise.correction.stress.concat(exercise.correction.pressure));
      let correctCount = 0;
      let studentCorrect = 0;

      Object.keys(selections).forEach(function (id) {
        const choice = selections[id];
        const isCorrect = (choice === "stress" && stressSet.has(id)) || (choice === "pressure" && pressureSet.has(id));
        if (isCorrect) {
          correctCount += 1;
          if (choice === "stress") {
            studentCorrect += 1;
          }
        }
      });

      if (showCorrection) {
        resultBadge.textContent = "Correction affichée";
        resultBadge.className = "module-status-badge is-success";
        resultText.textContent = "Les passages importants sont maintenant visibles dans le texte.";
        resultNote.textContent = "Le même principe de correction est utilisé dans les quatre exercices.";
      } else {
        const criterionReached = correctCount >= 4 && studentCorrect >= 2;
        resultBadge.textContent = criterionReached ? "Critère atteint" : "À renforcer";
        resultBadge.className = "module-status-badge " + (criterionReached ? "is-success" : "is-warning");
        resultText.textContent = "Vous avez identifié " + correctCount + " passage" + (correctCount > 1 ? "s" : "") + " pertinent" + (correctCount > 1 ? "s" : "") + ", dont " + studentCorrect + " venant de l’élève.";
        resultNote.textContent = criterionReached
          ? "Le critère attendu est atteint pour cet exercice."
          : "Le critère attendu est de 4 passages pertinents, dont au moins 2 venant de l’élève.";
      }

      feedbackList.innerHTML = "";

      const idsToComment = showCorrection
        ? Array.from(allCorrectIds)
        : Object.keys(selections).concat(Array.from(allCorrectIds).filter(function (id) { return !selections[id]; }));

      idsToComment.forEach(function (id) {
        const comment = exercise.comments[id];
        if (!comment) {
          return;
        }
        const item = document.createElement("div");
        item.className = "module-feedback-item";

        const isStress = stressSet.has(id);
        const title = document.createElement("strong");
        title.textContent = isStress ? "Stress probable." : "Pression émotionnelle.";
        item.appendChild(title);

        const copy = document.createElement("span");
        copy.textContent = " " + comment;
        item.appendChild(copy);

        feedbackList.appendChild(item);
      });
    }

    function renderResult() {
      if (isCorrectionShown()) {
        renderValidatedResult(true);
        return;
      }
      if (isValidated()) {
        renderValidatedResult(false);
        return;
      }
      if (Object.keys(currentSelections()).length) {
        resultBadge.textContent = "Annotation en cours";
        resultBadge.className = "module-status-badge";
        resultText.textContent = "Vos sélections ont été modifiées. Validez pour afficher le corrigé.";
        feedbackList.innerHTML = "";
        resultNote.textContent = "";
        return;
      }
      clearResult();
    }

    function renderAll() {
      renderHeader();
      renderTranscript();
      renderResult();
      root.querySelectorAll("[data-verbatim-mode]").forEach(function (button) {
        button.classList.toggle("is-active", button.dataset.verbatimMode === state.currentMode);
      });
    }

    function validate() {
      state.validatedByExercise[currentExercise().id] = true;
      state.correctionShownByExercise[currentExercise().id] = false;
      persist();
      renderAll();
    }

    function showCorrection() {
      state.validatedByExercise[currentExercise().id] = true;
      state.correctionShownByExercise[currentExercise().id] = true;
      persist();
      renderAll();
    }

    function resetCurrentExercise() {
      const exercise = currentExercise();
      state.selectionsByExercise[exercise.id] = {};
      state.validatedByExercise[exercise.id] = false;
      state.correctionShownByExercise[exercise.id] = false;
      persist();
      renderAll();
    }

    function goToExercise(index) {
      state.exerciseIndex = Math.max(0, Math.min(VERBATIM_EXERCISES.length - 1, index));
      persist();
      renderAll();
    }

    root.querySelectorAll("[data-verbatim-mode]").forEach(function (button) {
      button.addEventListener("click", function () {
        setMode(button.dataset.verbatimMode);
      });
    });

    root.querySelector("#verbatimValidateBtn").addEventListener("click", validate);
    root.querySelector("#verbatimCorrectionBtn").addEventListener("click", showCorrection);
    root.querySelector("#verbatimResetBtn").addEventListener("click", function () {
      if (!window.confirm("Réinitialiser cet exercice ?")) {
        return;
      }
      resetCurrentExercise();
    });
    prevBtn.addEventListener("click", function () {
      goToExercise(state.exerciseIndex - 1);
    });
    nextBtn.addEventListener("click", function () {
      goToExercise(state.exerciseIndex + 1);
    });

    renderAll();
  }

  function renderEvaluationModule() {
    return (
      '<div class="activity-module">' +
        '<section class="module-note-grid module-note-grid-single">' +
          '<article class="module-note">' +
            "<h2>Consigne</h2>" +
            "<p>Visionnez la scène, identifiez un élève en état probable de stress, puis justifiez votre lecture à l’aide de quatre indices observables.</p>" +
          "</article>" +
        "</section>" +
        '<section class="module-panel">' +
          '<div class="module-panel-head">' +
            "<div><h2>Scène de classe</h2></div>" +
            '<div class="module-status-row">' +
              '<span class="module-kpi" id="evalVideoStatus">Vidéo ADID</span>' +
              '<span class="module-kpi" id="evalCurrentTime">0:00</span>' +
              '<span class="module-kpi" id="evalDuration">0:00</span>' +
            "</div>" +
          "</div>" +
          '<div class="evaluation-video-shell">' +
            '<div class="evaluation-video-wrap">' +
              '<video id="evalSceneVideo" controls preload="metadata"></video>' +
              '<div class="evaluation-video-placeholder" id="evalVideoPlaceholder">Ajouter une vidéo de classe pour lancer l’analyse.</div>' +
            "</div>" +
            '<div class="module-inline-actions">' +
              '<button class="btn btn-ghost" type="button" id="evalRewindBtn">Revenir de 10 s</button>' +
              '<button class="btn btn-ghost" type="button" id="evalForwardBtn">Avancer de 10 s</button>' +
            "</div>" +
          "</div>" +
        "</section>" +
        '<section class="module-panel">' +
          '<div class="module-panel-head"><div><h2>Réponse de l’enseignant</h2><p>Construisez une réponse argumentée à partir d’indices observables.</p></div></div>' +
          '<div class="module-fields">' +
            '<div class="module-field"><label for="evalStudentName">Élève identifié</label><input id="evalStudentName" data-eval-field="studentName" type="text" placeholder="Ex. élève au premier rang à gauche" /></div>' +
            '<div class="module-field"><label for="evalStudentJustification">Justification brève</label><textarea id="evalStudentJustification" data-eval-field="studentJustification" placeholder="Expliquez pourquoi ce choix vous semble plausible."></textarea></div>' +
            '<div class="evaluation-evidence-grid">' +
              '<article class="evaluation-evidence-card">' +
                '<div class="module-field"><label for="evalCat1">Catégorie 1</label><select id="evalCat1" data-eval-field="cat1"><option value="">Choisir</option><option value="verbal">Verbal</option><option value="nonverbal">Non verbal</option><option value="contextuel">Contextuel</option></select></div>' +
                '<div class="module-field"><label for="evalObs1">Indice 1</label><textarea id="evalObs1" data-eval-field="obs1" placeholder="Décrivez ce qui est vu ou entendu."></textarea></div>' +
              "</article>" +
              '<article class="evaluation-evidence-card">' +
                '<div class="module-field"><label for="evalCat2">Catégorie 2</label><select id="evalCat2" data-eval-field="cat2"><option value="">Choisir</option><option value="verbal">Verbal</option><option value="nonverbal">Non verbal</option><option value="contextuel">Contextuel</option></select></div>' +
                '<div class="module-field"><label for="evalObs2">Indice 2</label><textarea id="evalObs2" data-eval-field="obs2" placeholder="Décrivez ce qui est vu ou entendu."></textarea></div>' +
              "</article>" +
              '<article class="evaluation-evidence-card">' +
                '<div class="module-field"><label for="evalCat3">Catégorie 3</label><select id="evalCat3" data-eval-field="cat3"><option value="">Choisir</option><option value="verbal">Verbal</option><option value="nonverbal">Non verbal</option><option value="contextuel">Contextuel</option></select></div>' +
                '<div class="module-field"><label for="evalObs3">Indice 3</label><textarea id="evalObs3" data-eval-field="obs3" placeholder="Décrivez ce qui est vu ou entendu."></textarea></div>' +
              "</article>" +
              '<article class="evaluation-evidence-card">' +
                '<div class="module-field"><label for="evalCat4">Catégorie 4</label><select id="evalCat4" data-eval-field="cat4"><option value="">Choisir</option><option value="verbal">Verbal</option><option value="nonverbal">Non verbal</option><option value="contextuel">Contextuel</option></select></div>' +
                '<div class="module-field"><label for="evalObs4">Indice 4</label><textarea id="evalObs4" data-eval-field="obs4" placeholder="Décrivez ce qui est vu ou entendu."></textarea></div>' +
              "</article>" +
            "</div>" +
          "</div>" +
        "</section>" +
        '<section class="module-panel module-panel-soft">' +
          '<div class="module-panel-head"><div><h2>Retour réflexif</h2><p>Reliez votre analyse de la scène à votre posture professionnelle.</p></div></div>' +
          '<div class="module-fields">' +
            '<div class="module-field"><label for="evalFeltMoment">Qu’as-tu ressenti à ce moment-là ?</label><textarea id="evalFeltMoment" data-eval-field="feltMoment" placeholder="Décrivez votre ressenti."></textarea></div>' +
            '<div class="module-field"><label for="evalTeacherReaction">Comment as-tu réagi ?</label><textarea id="evalTeacherReaction" data-eval-field="teacherReaction" placeholder="Décrivez votre réaction professionnelle."></textarea></div>' +
            '<div class="module-field"><label for="evalTeacherReview">Que penses-tu de ton retour ?</label><textarea id="evalTeacherReview" data-eval-field="teacherReview" placeholder="Analysez votre retour avec recul."></textarea></div>' +
          "</div>" +
          '<div class="module-actions">' +
            '<button class="btn btn-ghost" type="button" id="evalResetBtn">Réinitialiser la fiche</button>' +
            '<span class="module-inline-note" id="evalFlashNote"></span>' +
          "</div>" +
        "</section>" +
      "</div>"
    );
  }

  function initEvaluationModule(root, context) {
    const storageKey = makeKey(context);
    const defaultVideoSrc = "../videoADID.mp4";
    const fields = Array.from(root.querySelectorAll("[data-eval-field]"));
    const video = root.querySelector("#evalSceneVideo");
    const videoStatus = root.querySelector("#evalVideoStatus");
    const videoPlaceholder = root.querySelector("#evalVideoPlaceholder");
    const currentTime = root.querySelector("#evalCurrentTime");
    const duration = root.querySelector("#evalDuration");
    const flashNote = root.querySelector("#evalFlashNote");
    let debounceId = null;

    function getData() {
      const result = {};
      fields.forEach(function (field) {
        result[field.dataset.evalField] = field.value;
      });
      return result;
    }

    function save() {
      writeStorage(storageKey, getData());
    }

    function load() {
      const saved = readStorage(storageKey, {});
      fields.forEach(function (field) {
        field.value = saved[field.dataset.evalField] || "";
      });
    }

    function formatTime(seconds) {
      if (!Number.isFinite(seconds)) {
        return "0:00";
      }
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return minutes + ":" + String(secs).padStart(2, "0");
    }

    fields.forEach(function (field) {
      field.addEventListener("input", function () {
        window.clearTimeout(debounceId);
        debounceId = window.setTimeout(function () {
          save();
        }, 180);
      });
      field.addEventListener("change", function () {
        save();
      });
    });

    window.addEventListener("beforeunload", save);

    video.addEventListener("loadedmetadata", function () {
      duration.textContent = formatTime(video.duration);
      videoPlaceholder.classList.add("is-hidden");
    });

    video.addEventListener("timeupdate", function () {
      currentTime.textContent = formatTime(video.currentTime);
    });

    root.querySelector("#evalRewindBtn").addEventListener("click", function () {
      video.currentTime = Math.max(0, video.currentTime - 10);
    });

    root.querySelector("#evalForwardBtn").addEventListener("click", function () {
      if (!Number.isFinite(video.duration)) {
        return;
      }
      video.currentTime = Math.min(video.duration, video.currentTime + 10);
    });

    root.querySelector("#evalResetBtn").addEventListener("click", function () {
      if (!window.confirm("Réinitialiser cette fiche ?")) {
        return;
      }
      fields.forEach(function (field) {
        field.value = "";
      });
      save();
      video.pause();
      video.src = defaultVideoSrc;
      video.load();
      currentTime.textContent = "0:00";
      videoStatus.textContent = "Vidéo ADID";
      setFlashMessage(flashNote, "Fiche réinitialisée.");
    });

    load();
    video.src = defaultVideoSrc;
    video.load();
  }

  const modules = {
    sort: {
      render: renderSortModule,
      init: initSortModule
    },
    prep: {
      render: renderPrepModule,
      init: initPrepModule
    },
    verbatim: {
      render: renderVerbatimModule,
      init: initVerbatimModule
    },
    evaluation: {
      render: renderEvaluationModule,
      init: initEvaluationModule
    }
  };

  window.activityModules = {
    get: function (type) {
      return modules[type] || null;
    }
  };
})();
