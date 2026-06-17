const MAX_FILE_SIZE = 10 * 1024 * 1024;
const VALID_EXTENSIONS = [".xlsx", ".xls", ".csv"];
const THEME_KEY = "json-converter-theme";
const LANG_KEY = "json-converter-lang";

const TRANSLATIONS = {
    pt: {
        help_tooltip: "Arraste ficheiros, edite na tabela e converta para JSON instantaneamente.",
        theme_tooltip: "Alternar tema",
        developed_by: "Desenvolvido por JoãoMRB",
        dropzone_title: "Solte o seu ficheiro aqui",
        dropzone_subtitle: "ou clique para procurar (.xlsx, .xls, .csv até 10MB)",
        dropzone_invalid_ext: "Ficheiro não suportado.",
        dropzone_invalid_size: "Ficheiro demasiado grande. Máximo 10MB.",
        dropzone_read_fail: "Falha ao ler o ficheiro.",
        stats_title: "Estado e Dados",
        status_waiting: "Aguardando",
        status_processing: "A processar",
        status_error: "Erro",
        status_ready: "Pronto",
        stat_files: "Ficheiros Carregados",
        stat_sheet: "Sheet Ativa",
        stat_rows: "Linhas Totais",
        stat_cols: "Colunas",
        file_summary_empty: "Nenhum ficheiro selecionado.",
        actions_title: "Ações Principais",
        btn_convert: "Converter para JSON",
        btn_load_editor: "Carregar JSON no Editor",
        btn_clear_all: "Limpar Tudo",
        progress_reading: "A ler ficheiro...",
        progress_preparing: "A preparar {filename}...",
        progress_interpreting: "A interpretar {filename}...",
        progress_loaded: "{filename} carregado.",
        config_title: "Parâmetros de Conversão",
        opt_file: "Ficheiro Ativo",
        opt_sheet: "Sheet Activa",
        opt_structure: "Estrutura JSON",
        opt_container: "Contentor",
        opt_key: "Chave Customizada",
        opt_file_choose: "Escolha um ficheiro",
        opt_sheet_choose: "Escolha uma sheet",
        opt_structure_flat: "Flat (Plana)",
        opt_structure_nested: "Nested (Dot Notation)",
        opt_container_array: "Array de Objetos",
        opt_container_object: "Objeto Indexado",
        opt_key_auto: "Auto (index)",
        toggle_all_sheets: "Todas as Sheets",
        toggle_pretty: "Pretty Print",
        toggle_minify: "Minificar JSON",
        toggle_api: "Envelope API",
        preview_title: "Grelha de Dados",
        preview_subtitle: "Visualização das primeiras 10 linhas. Edite as células com duplo-clique antes de converter.",
        preview_no_data_hdr: "Sem Dados",
        preview_no_data_body: "Carregue um ficheiro para ver o preview interativo.",
        tab_json: "JSON Gerado",
        tab_excel: "JSON para Excel",
        output_title: "Ficheiro JSON de Output",
        btn_copy: "Copiar",
        btn_download: "Baixar",
        btn_expand: "Expandir",
        btn_collapse: "Fechar",
        output_status_ready: "Pronto para converter",
        output_status_empty: "Sem resultado",
        editor_title: "Cole o seu JSON para gerar .xlsx",
        btn_pull_output: "Puxar Output",
        btn_gen_excel: "Gerar Excel (.xlsx)",
        editor_placeholder: "[\n  { \"id\": 1, \"nome\": \"Ana\" }\n]",
        toast_load_file_first: "Carrega primeiro um ficheiro.",
        toast_json_success: "JSON gerado com sucesso.",
        toast_no_json_download: "Ainda não existe JSON para baixar.",
        toast_json_downloaded: "JSON descarregado.",
        toast_copied: "JSON copiado para a área de transferência.",
        toast_copy_fail: "Não foi possível copiar automaticamente.",
        toast_cleared: "Interface limpa e pronta para novo ficheiro.",
        toast_editor_loaded: "Output enviado para o editor.",
        toast_invalid_json: "O JSON precisa de ser um array ou objeto.",
        toast_paste_valid_json: "Cola JSON válido antes de gerar Excel.",
        toast_excel_generated: "Excel gerado a partir do JSON.",
        toast_convert_err: "Erro ao converter JSON para Excel: {err}",
        toast_files_loaded: "Ficheiros carregados com sucesso.",
        toast_file_loaded: "Ficheiro carregado com sucesso."
    },
    en: {
        help_tooltip: "Drag files, edit in the table, and convert to JSON instantly.",
        theme_tooltip: "Toggle theme",
        developed_by: "Developed by JoãoMRB",
        dropzone_title: "Drop your file here",
        dropzone_subtitle: "or click to browse (.xlsx, .xls, .csv up to 10MB)",
        dropzone_invalid_ext: "Unsupported file.",
        dropzone_invalid_size: "File too large. Maximum 10MB.",
        dropzone_read_fail: "Failed to read file.",
        stats_title: "Status & Data",
        status_waiting: "Waiting",
        status_processing: "Processing",
        status_error: "Error",
        status_ready: "Ready",
        stat_files: "Loaded Files",
        stat_sheet: "Active Sheet",
        stat_rows: "Total Rows",
        stat_cols: "Columns",
        file_summary_empty: "No file selected.",
        actions_title: "Main Actions",
        btn_convert: "Convert to JSON",
        btn_load_editor: "Load JSON into Editor",
        btn_clear_all: "Clear All",
        progress_reading: "Reading file...",
        progress_preparing: "Preparing {filename}...",
        progress_interpreting: "Interpreting {filename}...",
        progress_loaded: "{filename} loaded.",
        config_title: "Conversion Parameters",
        opt_file: "Active File",
        opt_sheet: "Active Sheet",
        opt_structure: "JSON Structure",
        opt_container: "Container",
        opt_key: "Custom Key",
        opt_file_choose: "Choose a file",
        opt_sheet_choose: "Choose a sheet",
        opt_structure_flat: "Flat",
        opt_structure_nested: "Nested (Dot Notation)",
        opt_container_array: "Array of Objects",
        opt_container_object: "Indexed Object",
        opt_key_auto: "Auto (index)",
        toggle_all_sheets: "All Sheets",
        toggle_pretty: "Pretty Print",
        toggle_minify: "Minify JSON",
        toggle_api: "API Envelope",
        preview_title: "Data Grid",
        preview_subtitle: "Preview of the first 10 rows. Double-click cells to edit before converting.",
        preview_no_data_hdr: "No Data",
        preview_no_data_body: "Load a file to see the interactive preview.",
        tab_json: "Generated JSON",
        tab_excel: "JSON to Excel",
        output_title: "Output JSON File",
        btn_copy: "Copy",
        btn_download: "Download",
        btn_expand: "Maximize",
        btn_collapse: "Close",
        output_status_ready: "Ready to convert",
        output_status_empty: "No result",
        editor_title: "Paste your JSON to generate .xlsx",
        btn_pull_output: "Pull Output",
        btn_gen_excel: "Generate Excel (.xlsx)",
        editor_placeholder: "[\n  { \"id\": 1, \"name\": \"Ana\" }\n]",
        toast_load_file_first: "Please load a file first.",
        toast_json_success: "JSON generated successfully.",
        toast_no_json_download: "No JSON to download yet.",
        toast_json_downloaded: "JSON downloaded.",
        toast_copied: "JSON copied to clipboard.",
        toast_copy_fail: "Could not copy automatically.",
        toast_cleared: "Interface cleared and ready for new file.",
        toast_editor_loaded: "Output sent to editor.",
        toast_invalid_json: "JSON must be an array or object.",
        toast_paste_valid_json: "Paste valid JSON before generating Excel.",
        toast_excel_generated: "Excel generated from JSON.",
        toast_convert_err: "Error converting JSON to Excel: {err}",
        toast_files_loaded: "Files loaded successfully.",
        toast_file_loaded: "File loaded successfully."
    }
};

const state = {
    workbooks: [],
    selectedFileIndex: 0,
    selectedSheetName: "",
    lastOutput: "",
    lastDownloadName: "conversao",
    previewRows: [],
    previewColumns: [],
    currentLanguage: "pt"
};

const elements = {
    languageSelect: document.getElementById("languageSelect"),
    inputFile: document.getElementById("inputFile"),
    dropZone: document.getElementById("dropZone"),
    fileSummary: document.getElementById("fileSummary"),
    fileSelector: document.getElementById("fileSelector"),
    statusBadge: document.getElementById("statusBadge"),
    statFiles: document.getElementById("statFiles"),
    statRows: document.getElementById("statRows"),
    statCols: document.getElementById("statCols"),
    statSheet: document.getElementById("statSheet"),
    progressPanel: document.getElementById("progressPanel"),
    progressBar: document.getElementById("progressBar"),
    progressLabel: document.getElementById("progressLabel"),
    convertButton: document.getElementById("convertButton"),
    jsonToExcelButton: document.getElementById("jsonToExcelButton"),
    resetButton: document.getElementById("resetButton"),
    sheetSelector: document.getElementById("sheetSelector"),
    structureMode: document.getElementById("structureMode"),
    containerMode: document.getElementById("containerMode"),
    keyField: document.getElementById("keyField"),
    allSheetsMode: document.getElementById("allSheetsMode"),
    prettyPrint: document.getElementById("prettyPrint"),
    minifyOutput: document.getElementById("minifyOutput"),
    apiEnvelope: document.getElementById("apiEnvelope"),
    previewTable: document.getElementById("previewTable"),
    output: document.getElementById("output"),
    outputWrapper: document.getElementById("outputWrapper"),
    copyButton: document.getElementById("copyButton"),
    downloadButton: document.getElementById("downloadButton"),
    expandButton: document.getElementById("expandButton"),
    outputEditor: document.getElementById("outputEditor"),
    downloadExcelButton: document.getElementById("downloadExcelButton"),
    loadOutputToEditor: document.getElementById("loadOutputToEditor"),
    themeToggle: document.getElementById("themeToggle"),
    themeIcon: document.getElementById("themeIcon"),
    appToast: document.getElementById("appToast"),
    toastBody: document.getElementById("toastBody")
};

const appToast = new bootstrap.Toast(elements.appToast, { delay: 2600 });

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function t(key) {
    const lang = state.currentLanguage || "pt";
    return TRANSLATIONS[lang]?.[key] || key;
}

function updateLanguageUI() {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.dataset.i18n;
        element.textContent = t(key);
    });
    
    document.querySelectorAll("[data-i18n-html]").forEach((element) => {
        const key = element.dataset.i18nHtml;
        element.innerHTML = t(key);
    });
    
    document.querySelectorAll("[data-i18n-title]").forEach((element) => {
        const key = element.dataset.i18nTitle;
        element.setAttribute("title", t(key));
        const tooltipInstance = bootstrap.Tooltip.getInstance(element);
        if (tooltipInstance) {
            tooltipInstance.dispose();
            new bootstrap.Tooltip(element);
        }
    });
    
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
        const key = element.dataset.i18nPlaceholder;
        element.setAttribute("placeholder", t(key));
    });
    
    if (!state.lastOutput) {
        updateOutput("", state.lastDownloadName);
    }
    
    if (!state.previewColumns.length) {
        renderEmptyPreview();
    }
    
    if (state.workbooks.length) {
        const workbookEntry = state.workbooks[state.selectedFileIndex];
        const sheetName = state.selectedSheetName;
        const rows = getRowsForSheet(workbookEntry, sheetName);
        updateStats(rows, sheetName);
    } else {
        elements.fileSummary.textContent = t("file_summary_empty");
        elements.statSheet.textContent = "-";
    }
    
    const badgeText = elements.statusBadge.textContent.toLowerCase();
    let activeKey = "waiting";
    let currentTone = "secondary";
    
    if (elements.statusBadge.className.includes("text-bg-info")) currentTone = "info";
    else if (elements.statusBadge.className.includes("text-bg-success")) currentTone = "success";
    else if (elements.statusBadge.className.includes("text-bg-danger")) currentTone = "danger";
    
    if (badgeText.includes("proc") || badgeText.includes("process")) activeKey = "processing";
    else if (badgeText.includes("err") || badgeText.includes("erro")) activeKey = "error";
    else if (badgeText.includes("pron") || badgeText.includes("ready") || badgeText.includes("pronto")) activeKey = "ready";
    setStatus(activeKey, currentTone);
}

function setLanguage(lang) {
    state.currentLanguage = lang;
    localStorage.setItem(LANG_KEY, lang);
    if (elements.languageSelect) {
        elements.languageSelect.value = lang;
    }
    updateLanguageUI();
}

function initLanguage() {
    setLanguage(localStorage.getItem(LANG_KEY) || "pt");
}

function showToast(message, type = "success", icon = "bi-check-circle-fill") {
    elements.appToast.className = "toast align-items-center border-0";
    elements.appToast.classList.add(
        type === "danger" ? "text-bg-danger" : type === "warning" ? "text-bg-warning" : "text-bg-success"
    );
    elements.toastBody.innerHTML = `<i class="bi ${icon}"></i><span>${escapeHtml(message)}</span>`;
    appToast.show();
}

function setTheme(theme) {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
    elements.themeIcon.className = theme === "dark" ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";
}

function initTheme() {
    setTheme(localStorage.getItem(THEME_KEY) || "dark");
}

function updateDropZoneState(mode) {
    elements.dropZone.classList.remove("is-valid", "is-invalid");

    if (mode === "valid") {
        elements.dropZone.classList.add("is-valid");
    }

    if (mode === "invalid") {
        elements.dropZone.classList.add("is-invalid");
    }
}

function updateProgress(percent, label) {
    const safePercent = Math.max(0, Math.min(100, Math.round(percent)));
    elements.progressPanel.classList.remove("d-none");
    elements.progressBar.style.width = `${safePercent}%`;
    elements.progressBar.textContent = `${safePercent}%`;
    elements.progressBar.setAttribute("aria-valuenow", String(safePercent));
    elements.progressLabel.textContent = label;
}

function hideProgress() {
    elements.progressPanel.classList.add("d-none");
    elements.progressBar.style.width = "0%";
    elements.progressBar.textContent = "0%";
    elements.progressBar.setAttribute("aria-valuenow", "0");
    elements.progressLabel.textContent = t("progress_reading");
}

function setStatus(label, tone = "secondary") {
    elements.statusBadge.className = `badge text-bg-${tone}`;
    elements.statusBadge.textContent = t("status_" + label);
}

function getExtension(fileName) {
    return `.${fileName.split(".").pop().toLowerCase()}`;
}

function validateFile(file) {
    const extension = getExtension(file.name);

    if (!VALID_EXTENSIONS.includes(extension)) {
        return { valid: false, message: t("dropzone_invalid_ext") };
    }

    if (file.size > MAX_FILE_SIZE) {
        return { valid: false, message: t("dropzone_invalid_size") };
    }

    return { valid: true };
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onerror = () => reject(new Error(t("dropzone_read_fail")));
        reader.onprogress = (event) => {
            if (event.lengthComputable) {
                updateProgress((event.loaded / event.total) * 100, t("progress_reading"));
            }
        };
        reader.onload = () => resolve(reader.result);

        if (getExtension(file.name) === ".csv") {
            reader.readAsText(file, "utf-8");
            return;
        }

        reader.readAsArrayBuffer(file);
    });
}

function readWorkbookFromFile(file, rawContent) {
    try {
        if (getExtension(file.name) === ".csv") {
            return XLSX.read(rawContent, { type: "string" });
        }

        return XLSX.read(rawContent, { type: "array" });
    } catch (error) {
        throw new Error(`Erro a ler ficheiro: ${error.message}`);
    }
}

function getRowsForSheet(workbookEntry, sheetName) {
    if (!workbookEntry || !sheetName) {
        return [];
    }

    const sheet = workbookEntry.workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(sheet, { defval: "", raw: false });
}

function populateFileSelector() {
    elements.fileSelector.innerHTML = "";

    if (!state.workbooks.length) {
        elements.fileSelector.innerHTML = `<option value="0">${t("opt_file_choose")}</option>`;
        elements.fileSelector.disabled = true;
        return;
    }

    state.workbooks.forEach((entry, index) => {
        const option = document.createElement("option");
        option.value = String(index);
        option.textContent = entry.fileName;
        option.selected = index === state.selectedFileIndex;
        elements.fileSelector.appendChild(option);
    });

    elements.fileSelector.disabled = false;
}

function populateKeyFieldOptions(rows) {
    const columns = rows.length ? Object.keys(rows[0]) : [];
    elements.keyField.innerHTML = `<option value="">${t("opt_key_auto")}</option>`;

    columns.forEach((column) => {
        const option = document.createElement("option");
        option.value = column;
        option.textContent = column;
        elements.keyField.appendChild(option);
    });

    elements.keyField.disabled = !columns.length;
}

function populateSheetSelector() {
    const workbookEntry = state.workbooks[state.selectedFileIndex];
    const sheetNames = workbookEntry ? workbookEntry.workbook.SheetNames : [];

    elements.sheetSelector.innerHTML = "";
    elements.keyField.innerHTML = `<option value="">${t("opt_key_auto")}</option>`;

    if (!sheetNames.length) {
        elements.sheetSelector.innerHTML = `<option value="">${t("opt_sheet_choose")}</option>`;
        elements.sheetSelector.disabled = true;
        elements.keyField.disabled = true;
        return;
    }

    sheetNames.forEach((sheetName, index) => {
        const option = document.createElement("option");
        option.value = sheetName;
        option.textContent = sheetName;
        option.selected = index === 0;
        elements.sheetSelector.appendChild(option);
    });

    state.selectedSheetName = sheetNames[0];
    elements.sheetSelector.disabled = false;
    populateKeyFieldOptions(getRowsForSheet(workbookEntry, state.selectedSheetName));
}

function updateStats(rows, sheetName) {
    const columns = rows.length ? Object.keys(rows[0]).length : 0;
    elements.statRows.textContent = String(rows.length);
    elements.statCols.textContent = String(columns);
    elements.statSheet.textContent = sheetName || "-";
    elements.fileSummary.textContent = state.workbooks.map((entry) => entry.fileName).join(", ");
}

function renderEmptyPreview() {
    elements.previewTable.innerHTML = [
        `<thead class="table-dark"><tr><th>${t("preview_no_data_hdr")}</th></tr></thead>`,
        `<tbody><tr><td class="text-soft">${t("preview_no_data_body")}</td></tr></tbody>`
    ].join("");
    elements.statRows.textContent = "0";
    elements.statCols.textContent = "0";
    elements.statSheet.textContent = "-";
}

function renderPreviewTable() {
    if (!state.previewColumns.length) {
        renderEmptyPreview();
        return;
    }

    const thead = `<thead class="table-dark"><tr>${state.previewColumns
        .map((column) => `<th>${escapeHtml(column)}</th>`)
        .join("")}</tr></thead>`;

    const tbody = state.previewRows
        .map((row, rowIndex) => {
            const cells = state.previewColumns
                .map((column) => {
                    const value = row[column] == null ? "" : String(row[column]);
                    return `<td contenteditable="true" data-row="${rowIndex}" data-column="${escapeHtml(column)}">${escapeHtml(value)}</td>`;
                })
                .join("");
            return `<tr>${cells}</tr>`;
        })
        .join("");

    elements.previewTable.innerHTML = `${thead}<tbody>${tbody}</tbody>`;
}

function refreshSheetPreview() {
    const workbookEntry = state.workbooks[state.selectedFileIndex];

    if (!workbookEntry) {
        renderEmptyPreview();
        return;
    }

    const sheetName = elements.sheetSelector.value || workbookEntry.workbook.SheetNames[0];
    const rows = getRowsForSheet(workbookEntry, sheetName);

    state.selectedSheetName = sheetName;
    state.previewRows = rows.slice(0, 10).map((row) => ({ ...row }));
    state.previewColumns = rows.length ? Object.keys(rows[0]) : [];

    populateKeyFieldOptions(rows);
    renderPreviewTable();
    updateStats(rows, sheetName);
}

function setByPath(target, path, value) {
    const keys = path.split(".");
    let current = target;

    keys.forEach((key, index) => {
        if (index === keys.length - 1) {
            current[key] = value;
            return;
        }

        if (typeof current[key] !== "object" || current[key] === null || Array.isArray(current[key])) {
            current[key] = {};
        }

        current = current[key];
    });
}

function applyStructure(row, mode) {
    if (mode !== "nested") {
        return { ...row };
    }

    const nested = {};

    Object.entries(row).forEach(([key, value]) => {
        if (key.includes(".")) {
            setByPath(nested, key, value);
            return;
        }

        nested[key] = value;
    });

    return nested;
}

function applyContainer(rows) {
    if (elements.containerMode.value === "array") {
        return rows;
    }

    const keyField = elements.keyField.value;

    return rows.reduce((accumulator, row, index) => {
        const rawKey = keyField ? row[keyField] : index;
        const key = rawKey === "" || rawKey == null ? `item_${index}` : String(rawKey);
        accumulator[key] = row;
        return accumulator;
    }, {});
}

function decorateOutput(payload, meta) {
    if (!elements.apiEnvelope.checked) {
        return payload;
    }

    return { meta, data: payload };
}

function buildSheetPayload(workbookEntry, sheetName, preferPreview = false) {
    const rows = getRowsForSheet(workbookEntry, sheetName);
    const mergedRows = preferPreview && sheetName === state.selectedSheetName
        ? rows.map((row, index) => (index < state.previewRows.length ? { ...row, ...state.previewRows[index] } : row))
        : rows;

    return mergedRows.map((row) => applyStructure(row, elements.structureMode.value));
}

function stringifyOutput(data) {
    const spacing = elements.minifyOutput.checked ? 0 : elements.prettyPrint.checked ? 2 : 0;
    return JSON.stringify(data, null, spacing);
}

function highlightOutput() {
    if (typeof hljs.highlightElement === "function") {
        hljs.highlightElement(elements.output);
    }
}

function updateOutput(jsonString, filename) {
    state.lastOutput = jsonString;
    state.lastDownloadName = filename;
    elements.output.textContent = jsonString || `{\n  "status": "${t("output_status_empty")}"\n}`;
    elements.output.removeAttribute("data-highlighted");
    highlightOutput();
    elements.copyButton.disabled = !jsonString;
    elements.downloadButton.disabled = !jsonString;
}

function convertToJson() {
    if (!state.workbooks.length) {
        showToast(t("toast_load_file_first"), "warning", "bi-exclamation-triangle-fill");
        return;
    }

    const selectedWorkbook = state.workbooks[state.selectedFileIndex];
    const targetSheets = elements.allSheetsMode.checked
        ? selectedWorkbook.workbook.SheetNames
        : [elements.sheetSelector.value];

    const result = elements.allSheetsMode.checked
        ? targetSheets.reduce((accumulator, sheetName) => {
            const mappedRows = buildSheetPayload(selectedWorkbook, sheetName, true);
            accumulator[sheetName] = decorateOutput(applyContainer(mappedRows), {
                rows: mappedRows.length,
                columns: mappedRows[0] ? Object.keys(mappedRows[0]).length : 0,
                sheet: sheetName,
                file: selectedWorkbook.fileName
            });
            return accumulator;
        }, {})
        : (() => {
            const mappedRows = buildSheetPayload(selectedWorkbook, targetSheets[0], true);
            return decorateOutput(applyContainer(mappedRows), {
                rows: mappedRows.length,
                columns: mappedRows[0] ? Object.keys(mappedRows[0]).length : 0,
                sheet: targetSheets[0],
                file: selectedWorkbook.fileName
            });
        })();

    updateOutput(stringifyOutput(result), selectedWorkbook.baseName);
    showToast(t("toast_json_success"));
}

function downloadTextFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
}

function downloadJson() {
    if (!state.lastOutput) {
        showToast(t("toast_no_json_download"), "warning", "bi-exclamation-triangle-fill");
        return;
    }

    downloadTextFile(state.lastOutput, `${state.lastDownloadName}.json`, "application/json");
    showToast(t("toast_json_downloaded"));
}

async function copyOutput() {
    if (!state.lastOutput) {
        return;
    }

    try {
        await navigator.clipboard.writeText(state.lastOutput);
        showToast(t("toast_copied"));
    } catch (error) {
        showToast(t("toast_copy_fail"), "danger", "bi-x-octagon-fill");
    }
}

function toggleOutputExpand() {
    elements.outputWrapper.classList.toggle("is-maximized");
    const maximized = elements.outputWrapper.classList.contains("is-maximized");

    elements.expandButton.innerHTML = maximized
        ? `<i class="bi bi-fullscreen-exit"></i> <span data-i18n="btn_collapse">${t("btn_collapse")}</span>`
        : `<i class="bi bi-arrows-fullscreen"></i> <span data-i18n="btn_expand">${t("btn_expand")}</span>`;
}

function resetState(showFeedback = true) {
    state.workbooks = [];
    state.selectedFileIndex = 0;
    state.selectedSheetName = "";
    state.lastOutput = "";
    state.lastDownloadName = "conversao";
    state.previewRows = [];
    state.previewColumns = [];

    elements.fileSummary.textContent = t("file_summary_empty");
    elements.fileSelector.innerHTML = `<option value="0">${t("opt_file_choose")}</option>`;
    elements.fileSelector.disabled = true;
    elements.sheetSelector.innerHTML = `<option value="">${t("opt_sheet_choose")}</option>`;
    elements.sheetSelector.disabled = true;
    elements.keyField.innerHTML = `<option value="">${t("opt_key_auto")}</option>`;
    elements.keyField.disabled = true;
    elements.convertButton.disabled = true;
    elements.copyButton.disabled = true;
    elements.downloadButton.disabled = true;
    elements.inputFile.value = "";
    elements.outputEditor.value = "";
    renderEmptyPreview();
    updateOutput("", "conversao");
    updateDropZoneState();
    setStatus("waiting", "secondary");
    elements.statFiles.textContent = "0";

    if (showFeedback) {
        showToast(t("toast_cleared"));
    }
}

function loadOutputIntoEditor() {
    elements.outputEditor.value = state.lastOutput;
    showToast(t("toast_editor_loaded"));
}

function normalizeJsonInput(input) {
    const parsed = JSON.parse(input);

    if (Array.isArray(parsed)) {
        return parsed;
    }

    if (parsed && Array.isArray(parsed.data)) {
        return parsed.data;
    }

    if (parsed && typeof parsed === "object") {
        return Object.values(parsed);
    }

    throw new Error(t("toast_invalid_json"));
}

function jsonToExcel() {
    const raw = elements.outputEditor.value.trim();

    if (!raw) {
        showToast(t("toast_paste_valid_json"), "warning", "bi-exclamation-triangle-fill");
        return;
    }

    try {
        const normalized = normalizeJsonInput(raw);
        const sheet = XLSX.utils.json_to_sheet(normalized);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, sheet, "Dados");
        XLSX.writeFile(workbook, "json-convertido.xlsx");

        showToast(t("toast_excel_generated"));
    } catch (error) {
        showToast(t("toast_convert_err").replace("{err}", error.message), "danger", "bi-x-octagon-fill");
    }
}

function syncPrettyMinify(source) {
    if (source === "pretty" && elements.prettyPrint.checked) {
        elements.minifyOutput.checked = false;
    }

    if (source === "minify" && elements.minifyOutput.checked) {
        elements.prettyPrint.checked = false;
    }
}

async function handleFiles(fileList) {
    const files = Array.from(fileList || []);

    if (!files.length) {
        return;
    }

    resetState(false);
    elements.statFiles.textContent = String(files.length);
    setStatus("processing", "info");

    for (const file of files) {
        const validation = validateFile(file);
        if (!validation.valid) {
            updateDropZoneState("invalid");
            hideProgress();
            setStatus("error", "danger");
            showToast(validation.message, "danger", "bi-x-octagon-fill");
            return;
        }
    }

    updateDropZoneState("valid");

    try {
        const loaded = [];

        for (let index = 0; index < files.length; index += 1) {
            const file = files[index];
            updateProgress((index / files.length) * 100, t("progress_preparing").replace("{filename}", file.name));
            const content = await readFile(file);
            updateProgress(((index + 0.6) / files.length) * 100, t("progress_interpreting").replace("{filename}", file.name));
            const workbook = readWorkbookFromFile(file, content);

            loaded.push({
                fileName: file.name,
                baseName: file.name.replace(/\.[^.]+$/, ""),
                workbook
            });

            updateProgress(((index + 1) / files.length) * 100, t("progress_loaded").replace("{filename}", file.name));
        }

        state.workbooks = loaded;
        state.selectedFileIndex = 0;
        populateFileSelector();
        populateSheetSelector();
        refreshSheetPreview();
        setStatus("ready", "success");
        elements.convertButton.disabled = false;
        showToast(files.length > 1 ? t("toast_files_loaded") : t("toast_file_loaded"));
    } catch (error) {
        updateDropZoneState("invalid");
        setStatus("error", "danger");
        showToast(error.message, "danger", "bi-x-octagon-fill");
    } finally {
        hideProgress();
    }
}

elements.dropZone.addEventListener("dragover", (event) => {
    event.preventDefault();
    elements.dropZone.classList.add("is-dragover");
});

elements.dropZone.addEventListener("dragleave", () => {
    elements.dropZone.classList.remove("is-dragover");
});

elements.dropZone.addEventListener("drop", (event) => {
    event.preventDefault();
    elements.dropZone.classList.remove("is-dragover");
    handleFiles(event.dataTransfer.files);
});

elements.inputFile.addEventListener("change", (event) => {
    handleFiles(event.target.files);
});

elements.fileSelector.addEventListener("change", (event) => {
    state.selectedFileIndex = Number(event.target.value) || 0;
    populateSheetSelector();
    refreshSheetPreview();
});

elements.sheetSelector.addEventListener("change", refreshSheetPreview);
elements.convertButton.addEventListener("click", convertToJson);
elements.downloadButton.addEventListener("click", downloadJson);
elements.copyButton.addEventListener("click", copyOutput);
elements.expandButton.addEventListener("click", toggleOutputExpand);
elements.resetButton.addEventListener("click", () => resetState(true));
elements.jsonToExcelButton.addEventListener("click", loadOutputIntoEditor);
elements.downloadExcelButton.addEventListener("click", jsonToExcel);
elements.loadOutputToEditor.addEventListener("click", loadOutputIntoEditor);

elements.languageSelect.addEventListener("change", (event) => {
    setLanguage(event.target.value);
});

elements.themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-bs-theme");
    setTheme(currentTheme === "dark" ? "light" : "dark");
});

elements.previewTable.addEventListener("input", (event) => {
    const target = event.target;

    if (!(target instanceof HTMLElement) || target.tagName !== "TD") {
        return;
    }

    const rowIndex = Number(target.dataset.row);
    const column = target.dataset.column;

    if (Number.isNaN(rowIndex) || !column || !state.previewRows[rowIndex]) {
        return;
    }

    state.previewRows[rowIndex][column] = target.textContent || "";
});

elements.prettyPrint.addEventListener("change", () => syncPrettyMinify("pretty"));
elements.minifyOutput.addEventListener("change", () => syncPrettyMinify("minify"));

elements.allSheetsMode.addEventListener("change", () => {
    elements.sheetSelector.disabled = elements.allSheetsMode.checked || !state.workbooks.length;
});

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && elements.outputWrapper.classList.contains("is-maximized")) {
        toggleOutputExpand();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initLanguage();
    updateOutput("", "conversao");
    hideProgress();
    renderEmptyPreview();

    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((element) => {
        new bootstrap.Tooltip(element);
    });
});
