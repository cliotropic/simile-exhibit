/*==================================================
 *  Exhibit.ViewPanel Swedish localization
 *==================================================
 */

Exhibit.ViewPanel.l10n = {
    resetFiltersLabel:  "�terst�ll",
    createSelectViewActionTitle: function(viewLabel) {
        return "v�lj vyn " + viewLabel;
    },
    createNoResultsTemplate: function(
        countClass,
        typesClass,
        detailsClass
    ) {
        return [
            {   tag:        "span",
                className:  countClass,
                children:   [ "0" ]
            },
            {   tag:        "span",
                className:  typesClass,
                children:   [ " resultat" ]
            },
            ". ",
            {   tag:        "span",
                className:  detailsClass,
                children:   [ "V�lj bort n�gra filter f�r fler resultat." ]
            }
        ];
    },

    createResultsSummaryTemplate: function(
        countClass,
        typesClass,
        detailsClass,
        resetActionLink
    ) {
        return [
            {   tag:        "span",
                className:  countClass,
                field:      "itemCountSpan"
            },
            {   tag:        "span",
                className:  typesClass,
                field:      "typesSpan"
            },
            {   tag:        "span",
                className:  detailsClass,
                field:      "noFilterDetailsSpan",
                style:      { display: "none" },
                children:   [ "totalt" ]
            },
            {   tag:        "span",
                className:  detailsClass,
                field:      "filteredDetailsSpan",
                style:      { display: "none" },
                children: [
                    " filtrerade fr�n ",
                    {   tag:    "span",
                        field:  "originalCountSpan"
                    },
                    " av ursprungliga (",
                    {   elmt:  resetActionLink,
                        title: "V�lj bort alla filter och se samtliga"
                    },
                    ")"
                ]
            }
        ];
    },

    missingViewClassMessage: "Specifikationen f�r en av vyerna saknas i f�ltet viewClass.",
    viewClassNotFunctionMessage: function(expr) {
        return "V�rdet '" + expr + "' du angivit f�r attributet viewClass\n" +
            "f�r en av dessa vyer var inte namnet p� en javascriptfunktion.";
    },
    badViewClassMessage: function(expr) {
        return "V�rdet '" + expr + "' du angivit f�r attributet viewClass\n" +
            "f�r en av dessa vyer �r inte ett giltigt javascriptuttryck.";
    }
};
