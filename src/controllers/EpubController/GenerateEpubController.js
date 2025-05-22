const fs = require("fs");
const path = require("path");
const PDFParser = require("pdf2json");
const Epub = require("epub-gen");

const groupTextLines = (texts, yThreshold = 1.5, xThreshold = 2.5) => {
    const lines = [];

    texts.sort((a, b) => a.y - b.y || a.x - b.x);

    texts.forEach((textObj) => {
        const text = decodeURIComponent(textObj.R[0].T || "");

        let added = false;

        for (const line of lines) {
            if (Math.abs(line.y - textObj.y) < yThreshold) {
                // junta sem espaço se estiver colado, senão com espaço
                line.text += (textObj.x - line.lastX < xThreshold ? "" : " ") + text;
                line.lastX = textObj.x;
                added = true;
                break;
            }
        }

        if (!added) {
            lines.push({
                y: textObj.y,
                text,
                lastX: textObj.x
            });
        }
    });

    return lines.map(line => line.text).join("\n");
};

const GenerateEpub = async (req, res) => {
    if (!req.files) return res.status(400).json({ error: "PDF não enviado." });

    const filePath = req.files.Ebook[0].path;

    try {
        const pdfParser = new PDFParser();

        pdfParser.on("pdfParser_dataReady", async (pdfData) => {
            const content = [];

            pdfData.Pages.forEach((page, pageIndex) => {
                const texts = page.Texts;
                if (!texts || texts.length === 0) return;

                const pageText = groupTextLines(texts);

                if (pageText.trim().length > 0) {
                    content.push({
                        title: `Página ${pageIndex + 1}`,
                        data: pageText.trim()
                    });
                }
            });

            if (content.length === 0) {
                return res.status(400).json({ error: "Nenhum conteúdo textual encontrado no PDF." });
            }

            const epubPath = path.join("uploads", `${Date.now()}.epub`);

            await new Epub({
                title: "Livro Estruturado",
                author: "Sistema Libra",
                content
            }, epubPath);

            return res.status(200).json({ message: "EPUB gerado!", epubPath });
        });

        pdfParser.on("pdfParser_dataError", err =>
            res.status(500).json({ error: "Erro ao processar PDF", details: err })
        );

        pdfParser.loadPDF(filePath);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro geral." });
    }
};

module.exports = GenerateEpub;
