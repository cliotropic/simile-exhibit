/*==================================================
 *  Exhibit Swedish localization
 *==================================================
 */

Exhibit.l10n = {
    missingLabel:   "saknas",
    missingSortKey: "(saknas)",
    notApplicableSortKey: "(n/a)",
    itemLinkLabel:  "l�nk",

    busyIndicatorMessage:       "Arbetar...",
    showDocumentationMessage:   "Relevant dokumentation kommer visas efter det h�r meddelandet.",
    showJavascriptValidationMessage: "Felet f�rklaras mer ing�ende efter det h�r meddelandet.",

    showJsonValidationMessage: "Felet f�rklaras mer ing�ende efter det h�r meddelandet.",
    showJsonValidationFormMessage: "Vi skickar dig till en webtj�nst du kan ladda upp din kod till f�r fels�kning efter det h�r meddelandet.",

    badJsonMessage: function(url, e) {
        return "JSON-filen\n  " + url + "\ninneh�ller fel:\n\n" + e;
    },
    failedToLoadDataFileMessage: function(url) {
        return "Kunde inte hitta filen\n  " + url +
             "\nKontrollera att filnamnet �r korrekt.";
    },

    /*
     *  Copy button and dialog box
     */
    copyButtonLabel:                "Kopiera",
    copyAllButtonLabel:             "Kopiera allt",
    copyDialogBoxCloseButtonLabel:  "St�ng",
    copyDialogBoxPrompt:
        "Kopiera det h�r till klippbordet precis som du skulle g�ra f�r annan text. Tryck ESC f�r att st�nga den h�r dialogen.",

    /*
     *  Focusdialog box
     */
    focusDialogBoxCloseButtonLabel:  "St�ng",

    /*
     *  Common exporters' labels
     */
    rdfXmlExporterLabel:            "RDF/XML",
    smwExporterLabel:               "Semantisk wikitext",
    exhibitJsonExporterLabel:       "Exhibit JSON",
    tsvExporterLabel:               "Tabseparerade v�rden",

    /*
     *  List composition
     */
    composeListString: function(a) {
        var s = "";
        for (var i = 0; i < a.length; i++) {
            if (i > 0) {
                if (i < a.length - 1)
                    s += ", ";
                else
                    s += " och ";
            }
            s += a[i];
        }
        return s;
    },
    createListDelimiter: function(parentElmt, count) {
        var f = function() {
            if (f.index > 0 && f.index < count) {
                parentElmt.appendChild(document.createTextNode(
                    (f.index == count - 1) ? " och " : ", "));
            }
            f.index++;
        };
        f.index = 0;

        return f;
    }
};
