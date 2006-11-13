/*==================================================
 *  Exhibit.ViewPanel English localization
 *==================================================
 */
 
Exhibit.ViewPanel.l10n = {
    resetFiltersLabel:  "reset",
    createSelectViewActionTitle: function(viewLabel) {
        return "select " + viewLabel + " view";
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
                children:   [ " results" ]
            },
            ". ",
            {   tag:        "span",
                className:  detailsClass,
                children:   [ "Remove some filters to get some results." ]
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
                children:   [ "total" ]
            },
            {   tag:        "span",
                className:  detailsClass,
                field:      "filteredDetailsSpan",
                style:      { display: "none" },
                children: [
                    " filtered from ",
                    {   tag:    "span",
                        field:  "originalCountSpan"
                    },
                    " originally (",
                    {   elmt:  resetActionLink,
                        title: "Clear all filters and see the original items"
                    },
                    ")"
                ]
            }
        ];
    }
};
