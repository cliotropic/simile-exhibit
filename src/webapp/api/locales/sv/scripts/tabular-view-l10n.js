/*==================================================
 *  Exhibit.TabularView Swedish localization
 *==================================================
 */

Exhibit.TabularView.l10n = {
    viewLabel:          "Tabell",
    viewTooltip:        "Visa i tabell",
    resetActionTitle:   "�terst�ll",

    columnHeaderSortTooltip:    "Klicka f�r att sortera efter den h�r kolumnen",
    columnHeaderReSortTooltip:  "Klicka f�r att v�lja omv�nd ordning",
    makeSortActionTitle: function(label, ascending) {
        return "sortera efter " + (ascending ? "stigande " : "fallande ") +
            label;
    }
};
