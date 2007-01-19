/*==================================================
 *  Exhibit.OrderedViewFrame Spanish localization
 *==================================================
 */
 
Exhibit.OrderedViewFrame.l10n = {
    thenSortByLabel:    "luego por...",
    removeOrderLabel:   "Eliminar este orden",
    formatSortActionTitle: function(propertyLabel, sortLabel) {
        return "Ordenados por " + propertyLabel + " (" + sortLabel + ")";
    },
    formatRemoveOrderActionTitle: function(propertyLabel, sortLabel) {
        return "Eliminar ordenaci�n por " + propertyLabel + " (" + sortLabel + ")";
    },
    resetActionTitle:   "Reset",
    formatDontShowAll: function(limitCount) {
        return "Mostrar solamente " + limitCount + " resultados";
    },
    formatShowAll: function(count) {
        return "Mostrar " + count + " resultados";
    },
    createSortingControlsTemplate: function(
        thenSortByActionLink
    ) {
        return [
            "ordenados por: ",
            {   tag:    "span",
                field:  "ordersSpan"
            },
            "; ",
            {   elmt:  thenSortByActionLink,
                title: "Seguir ordenando elementos",
                field: "thenByLink"
            }
        ];
    },
    groupedAsSorted: "agrupar seg�n orden",
    groupAsSortedActionTitle: "agrupar seg�n orden",
    ungroupActionTitle: "sin agrupar",
    
    showDuplicates: "mostrar duplicados",
    showDuplicatesActionTitle: "mostrar duplicados",
    hideDuplicatesActionTitle: "ocultar duplicados"
};