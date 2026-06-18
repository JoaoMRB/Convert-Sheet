/* ==========================================================================
   Convert/Sheet — app.js
   All features: URL Import, Search/Filter, Data Cleansing, Type Validation,
   Multi-format Export (JSON/YAML/XML/Markdown), Integration Snippets,
   Multilanguage (PT/EN), Dark/Light Theme.
   ========================================================================== */

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const VALID_EXTENSIONS = [".xlsx", ".xls", ".csv"];
const THEME_KEY = "json-converter-theme";
const LANG_KEY  = "json-converter-lang";

/* --------------------------------------------------------------------------
   Translations
   -------------------------------------------------------------------------- */
const TRANSLATIONS = {
    pt: {
        help_tooltip: "Arraste ficheiros, edite a grelha, filtre linhas e exporte em múltiplos formatos.",
        theme_tooltip: "Alternar tema",
        developed_by: "Desenvolvido por JoãoMRB",

        dropzone_title: "Solte o seu ficheiro aqui",
        dropzone_subtitle: "ou clique para procurar (.xlsx, .xls, .csv até 10MB)",
        dropzone_invalid_ext: "Ficheiro não suportado.",
        dropzone_invalid_size: "Ficheiro demasiado grande. Máximo 10MB.",
        dropzone_read_fail: "Falha ao ler o ficheiro.",

        url_import_toggle: "Importar a partir de URL",
        url_placeholder: "https://exemplo.com/dados.csv",
        url_fetch: "Carregar",
        url_fetching: "A carregar...",
        url_fetch_success: "Ficheiro importado com sucesso.",
        url_fetch_fail: "Não foi possível carregar o URL: {err}",
        url_empty: "Insira um URL válido.",
        url_cors: "CORS bloqueado — o servidor não permite acesso direto.",

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

        search_placeholder: "Filtrar linhas...",
        search_results: "{n} de {total}",

        clean_trim_tip: "Remover espaços em branco das células",
        clean_camel_tip: "Converter cabeçalhos para camelCase",
        clean_snake_tip: "Converter cabeçalhos para snake_case",
        clean_upper_tip: "Converter cabeçalhos para UPPERCASE",
        clean_empty_tip: "Remover linhas completamente vazias",
        clean_trim_done: "Espaços removidos.",
        clean_case_done: "Cabeçalhos convertidos.",
        clean_empty_done: "{n} linha(s) vazia(s) removida(s).",
        clean_empty_none: "Sem linhas vazias para remover.",

        col_type_text: "Texto",
        col_type_number: "Número",
        col_type_boolean: "Booleano",
        col_type_date: "Data",
        validation_error: "{n} célula(s) inválida(s) detetadas.",

        preview_title: "Grelha de Dados",
        preview_subtitle: "Visualização das primeiras 10 linhas. Edite as células antes de converter.",
        preview_no_data_hdr: "Sem Dados",
        preview_no_data_body: "Carregue um ficheiro para ver o preview interativo.",

        tab_json: "JSON Gerado",
        tab_excel: "JSON para Excel",
        tab_integration: "Integração",

        format_label: "Formato:",
        output_title: "Ficheiro de Output",
        btn_copy: "Copiar",
        btn_download: "Baixar",
        btn_expand: "Expandir",
        btn_collapse: "Fechar",
        output_status_empty: "Sem resultado",

        editor_title: "Cole o seu JSON para gerar .xlsx",
        btn_pull_output: "Puxar Output",
        btn_gen_excel: "Gerar Excel (.xlsx)",
        editor_placeholder: "[\n  { \"id\": 1, \"nome\": \"Ana\" }\n]",

        integration_title: "Templates de Integração",
        snippet_no_data: "// Converta dados primeiro para gerar um snippet.",

        toast_load_file_first: "Carrega primeiro um ficheiro.",
        toast_json_success: "Convertido com sucesso.",
        toast_no_json_download: "Ainda não existe output para baixar.",
        toast_json_downloaded: "Ficheiro descarregado.",
        toast_copied: "Copiado para a área de transferência.",
        toast_copy_fail: "Não foi possível copiar automaticamente.",
        toast_cleared: "Interface limpa e pronta para novo ficheiro.",
        toast_editor_loaded: "Output enviado para o editor.",
        toast_invalid_json: "O JSON precisa de ser um array ou objeto.",
        toast_paste_valid_json: "Cola JSON válido antes de gerar Excel.",
        toast_excel_generated: "Excel gerado a partir do JSON.",
        toast_convert_err: "Erro ao converter JSON para Excel: {err}",
        toast_files_loaded: "Ficheiros carregados com sucesso.",
        toast_file_loaded: "Ficheiro carregado com sucesso.",
    },
    en: {
        help_tooltip: "Drag files, edit the grid, filter rows and export in multiple formats.",
        theme_tooltip: "Toggle theme",
        developed_by: "Developed by JoãoMRB",

        dropzone_title: "Drop your file here",
        dropzone_subtitle: "or click to browse (.xlsx, .xls, .csv up to 10MB)",
        dropzone_invalid_ext: "Unsupported file.",
        dropzone_invalid_size: "File too large. Maximum 10MB.",
        dropzone_read_fail: "Failed to read file.",

        url_import_toggle: "Import from URL",
        url_placeholder: "https://example.com/data.csv",
        url_fetch: "Load",
        url_fetching: "Loading...",
        url_fetch_success: "File imported successfully.",
        url_fetch_fail: "Could not load URL: {err}",
        url_empty: "Please enter a valid URL.",
        url_cors: "CORS blocked — the server does not allow direct access.",

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

        search_placeholder: "Filter rows...",
        search_results: "{n} of {total}",

        clean_trim_tip: "Remove whitespace from all cells",
        clean_camel_tip: "Convert headers to camelCase",
        clean_snake_tip: "Convert headers to snake_case",
        clean_upper_tip: "Convert headers to UPPERCASE",
        clean_empty_tip: "Remove completely empty rows",
        clean_trim_done: "Whitespace removed.",
        clean_case_done: "Headers converted.",
        clean_empty_done: "{n} empty row(s) removed.",
        clean_empty_none: "No empty rows to remove.",

        col_type_text: "Text",
        col_type_number: "Number",
        col_type_boolean: "Boolean",
        col_type_date: "Date",
        validation_error: "{n} invalid cell(s) detected.",

        preview_title: "Data Grid",
        preview_subtitle: "Preview of the first 10 rows. Edit cells before converting.",
        preview_no_data_hdr: "No Data",
        preview_no_data_body: "Load a file to see the interactive preview.",

        tab_json: "Generated JSON",
        tab_excel: "JSON to Excel",
        tab_integration: "Integration",

        format_label: "Format:",
        output_title: "Output File",
        btn_copy: "Copy",
        btn_download: "Download",
        btn_expand: "Maximize",
        btn_collapse: "Close",
        output_status_empty: "No result",

        editor_title: "Paste your JSON to generate .xlsx",
        btn_pull_output: "Pull Output",
        btn_gen_excel: "Generate Excel (.xlsx)",
        editor_placeholder: "[\n  { \"id\": 1, \"name\": \"Ana\" }\n]",

        integration_title: "Integration Templates",
        snippet_no_data: "// Convert data first to generate a snippet.",

        toast_load_file_first: "Please load a file first.",
        toast_json_success: "Converted successfully.",
        toast_no_json_download: "No output to download yet.",
        toast_json_downloaded: "File downloaded.",
        toast_copied: "Copied to clipboard.",
        toast_copy_fail: "Could not copy automatically.",
        toast_cleared: "Interface cleared and ready for new file.",
        toast_editor_loaded: "Output sent to editor.",
        toast_invalid_json: "JSON must be an array or object.",
        toast_paste_valid_json: "Paste valid JSON before generating Excel.",
        toast_excel_generated: "Excel generated from JSON.",
        toast_convert_err: "Error converting JSON to Excel: {err}",
        toast_files_loaded: "Files loaded successfully.",
        toast_file_loaded: "File loaded successfully.",
    }
};

/* --------------------------------------------------------------------------
   State
   -------------------------------------------------------------------------- */
const state = {
    workbooks: [],
    selectedFileIndex: 0,
    selectedSheetName: "",
    lastOutput: "",
    lastPayload: null,
    lastDownloadName: "output",
    lastFormat: "json",
    previewRows: [],
    previewColumns: [],
    columnTypes: {},      // { colName: "text"|"number"|"boolean"|"date" }
    searchQuery: "",
    currentLanguage: "pt",
    activeSnippetLang: "fetch",
};

/* --------------------------------------------------------------------------
   DOM References
   -------------------------------------------------------------------------- */
const elements = {
    languageSelect:       document.getElementById("languageSelect"),
    inputFile:            document.getElementById("inputFile"),
    dropZone:             document.getElementById("dropZone"),
    fileSummary:          document.getElementById("fileSummary"),
    fileSelector:         document.getElementById("fileSelector"),
    statusBadge:          document.getElementById("statusBadge"),
    statFiles:            document.getElementById("statFiles"),
    statRows:             document.getElementById("statRows"),
    statCols:             document.getElementById("statCols"),
    statSheet:            document.getElementById("statSheet"),
    progressPanel:        document.getElementById("progressPanel"),
    progressBar:          document.getElementById("progressBar"),
    progressLabel:        document.getElementById("progressLabel"),
    convertButton:        document.getElementById("convertButton"),
    jsonToExcelButton:    document.getElementById("jsonToExcelButton"),
    resetButton:          document.getElementById("resetButton"),
    sheetSelector:        document.getElementById("sheetSelector"),
    structureMode:        document.getElementById("structureMode"),
    containerMode:        document.getElementById("containerMode"),
    keyField:             document.getElementById("keyField"),
    allSheetsMode:        document.getElementById("allSheetsMode"),
    prettyPrint:          document.getElementById("prettyPrint"),
    minifyOutput:         document.getElementById("minifyOutput"),
    apiEnvelope:          document.getElementById("apiEnvelope"),
    previewTable:         document.getElementById("previewTable"),
    searchInput:          document.getElementById("searchInput"),
    searchCount:          document.getElementById("searchCount"),
    cleanTrim:            document.getElementById("cleanTrim"),
    cleanCamel:           document.getElementById("cleanCamel"),
    cleanSnake:           document.getElementById("cleanSnake"),
    cleanUpper:           document.getElementById("cleanUpper"),
    cleanEmpty:           document.getElementById("cleanEmpty"),
    output:               document.getElementById("output"),
    outputWrapper:        document.getElementById("outputWrapper"),
    outputCloseButton:    document.getElementById("outputCloseButton"),
    copyButton:           document.getElementById("copyButton"),
    downloadButton:       document.getElementById("downloadButton"),
    expandButton:         document.getElementById("expandButton"),
    outputEditor:         document.getElementById("outputEditor"),
    downloadExcelButton:  document.getElementById("downloadExcelButton"),
    loadOutputToEditor:   document.getElementById("loadOutputToEditor"),
    themeToggle:          document.getElementById("themeToggle"),
    themeIcon:            document.getElementById("themeIcon"),
    appToast:             document.getElementById("appToast"),
    toastBody:            document.getElementById("toastBody"),
    urlImportToggle:      document.getElementById("urlImportToggle"),
    urlImportBar:         document.getElementById("urlImportBar"),
    urlChevron:           document.getElementById("urlChevron"),
    urlInput:             document.getElementById("urlInput"),
    urlFetchBtn:          document.getElementById("urlFetchBtn"),
    formatPills:          document.getElementById("formatPills"),
    snippetOutput:        document.getElementById("snippetOutput"),
    copySnippetBtn:       document.getElementById("copySnippetBtn"),
};

const appToast = new bootstrap.Toast(elements.appToast, { delay: 2800 });

/* ==========================================================================
   i18n
   ========================================================================== */
function t(key) {
    return TRANSLATIONS[state.currentLanguage]?.[key] ?? TRANSLATIONS.pt[key] ?? key;
}

function updateLanguageUI() {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        el.setAttribute("placeholder", t(el.dataset.i18nPlaceholder));
    });
    document.querySelectorAll("[data-i18n-title]").forEach(el => {
        el.setAttribute("title", t(el.dataset.i18nTitle));
        const tip = bootstrap.Tooltip.getInstance(el);
        if (tip) { tip.dispose(); new bootstrap.Tooltip(el); }
    });

    // Re-render dynamic text that was set via JS
    if (!state.lastOutput) updateOutput("", state.lastDownloadName);
    if (!state.previewColumns.length) renderEmptyPreview();
    if (state.workbooks.length) {
        const wb = state.workbooks[state.selectedFileIndex];
        updateStats(getRowsForSheet(wb, state.selectedSheetName), state.selectedSheetName);
    } else {
        elements.fileSummary.textContent = t("file_summary_empty");
    }
    // Re-render snippet placeholder if no data
    if (!state.lastOutput) {
        elements.snippetOutput.textContent = t("snippet_no_data");
        elements.snippetOutput.removeAttribute("data-highlighted");
        hljs.highlightElement(elements.snippetOutput);
    }
}

function setLanguage(lang) {
    state.currentLanguage = lang;
    localStorage.setItem(LANG_KEY, lang);
    if (elements.languageSelect) elements.languageSelect.value = lang;
    updateLanguageUI();
    refreshCustomSelects();
}

function initLanguage() {
    setLanguage(localStorage.getItem(LANG_KEY) || "pt");
}

/* ==========================================================================
   Custom Comboboxes
   ========================================================================== */
const customSelects = new WeakMap();
let activeCustomSelect = null;

function getSelectedOption(select) {
    return select.options[select.selectedIndex] || select.options[0];
}

function getCustomSelectLabel(select) {
    const explicitLabel = select.getAttribute("aria-label");
    if (explicitLabel) return explicitLabel;
    if (select.id) {
        const label = document.querySelector(`label[for="${select.id}"]`);
        if (label) return label.textContent.trim();
    }
    return select.dataset.col || "Select option";
}

function closeCustomSelect(custom, focusButton = false) {
    if (!custom) return;
    custom.root.classList.remove("is-open");
    custom.button.setAttribute("aria-expanded", "false");
    if (activeCustomSelect === custom) activeCustomSelect = null;
    if (focusButton) custom.button.focus();
}

function closeActiveCustomSelect(focusButton = false) {
    closeCustomSelect(activeCustomSelect, focusButton);
}

function setCustomSelectValue(select, value) {
    if (select.disabled) return;
    select.value = value;
    select.dispatchEvent(new Event("change", { bubbles: true }));
    refreshCustomSelect(select);
    closeActiveCustomSelect(true);
}

function updateCustomSelectHighlight(custom) {
    const options = Array.from(custom.list.querySelectorAll(".custom-select-option:not(:disabled)"));
    options.forEach((option, index) => {
        const highlighted = index === custom.highlightedIndex;
        option.classList.toggle("is-highlighted", highlighted);
        if (highlighted) option.scrollIntoView({ block: "nearest" });
    });
}

function renderCustomSelectOptions(select) {
    const custom = customSelects.get(select);
    if (!custom) return;

    const selected = getSelectedOption(select);
    custom.value.textContent = selected ? selected.textContent : "";
    custom.root.classList.toggle("is-disabled", select.disabled);
    custom.button.disabled = select.disabled;
    custom.button.setAttribute("aria-label", getCustomSelectLabel(select));
    custom.button.setAttribute("aria-disabled", String(select.disabled));
    custom.list.innerHTML = "";

    Array.from(select.options).forEach((option, index) => {
        const item = document.createElement("button");
        item.type = "button";
        item.className = "custom-select-option";
        item.setAttribute("role", "option");
        item.setAttribute("aria-selected", String(option.selected));
        item.dataset.value = option.value;
        item.textContent = option.textContent;
        item.disabled = option.disabled;
        if (option.selected) item.classList.add("is-selected");
        item.addEventListener("click", () => setCustomSelectValue(select, option.value));
        item.addEventListener("mousemove", () => {
            custom.highlightedIndex = index;
            updateCustomSelectHighlight(custom);
        });
        custom.list.appendChild(item);
    });
}

function openCustomSelect(custom) {
    if (custom.select.disabled) return;
    if (activeCustomSelect && activeCustomSelect !== custom) closeCustomSelect(activeCustomSelect);
    custom.root.classList.add("is-open");
    custom.button.setAttribute("aria-expanded", "true");
    activeCustomSelect = custom;
    const enabledOptions = Array.from(custom.list.querySelectorAll(".custom-select-option:not(:disabled)"));
    const selectedIndex = enabledOptions.findIndex(option => option.classList.contains("is-selected"));
    custom.highlightedIndex = Math.max(0, selectedIndex);
    updateCustomSelectHighlight(custom);
}

function toggleCustomSelect(custom) {
    if (custom.root.classList.contains("is-open")) closeCustomSelect(custom);
    else openCustomSelect(custom);
}

function handleCustomSelectKeydown(event, custom) {
    const options = Array.from(custom.list.querySelectorAll(".custom-select-option:not(:disabled)"));
    if (!options.length) return;

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        if (!custom.root.classList.contains("is-open")) openCustomSelect(custom);
        const direction = event.key === "ArrowDown" ? 1 : -1;
        custom.highlightedIndex = (custom.highlightedIndex + direction + options.length) % options.length;
        updateCustomSelectHighlight(custom);
        return;
    }

    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (!custom.root.classList.contains("is-open")) {
            openCustomSelect(custom);
            return;
        }
        const option = options[custom.highlightedIndex] || options[0];
        if (option) setCustomSelectValue(custom.select, option.dataset.value);
        return;
    }

    if (event.key === "Escape") {
        event.preventDefault();
        closeCustomSelect(custom, true);
    }
}

function initCustomSelect(select) {
    if (customSelects.has(select)) {
        refreshCustomSelect(select);
        return;
    }

    const wrapper = select.closest(".select-wrapper");
    if (!wrapper) return;

    wrapper.classList.add("custom-select-ready");
    select.classList.add("native-select-hidden");
    select.tabIndex = -1;

    const root = document.createElement("div");
    root.className = "custom-select";
    if (select.classList.contains("language-select")) root.classList.add("custom-select-language");
    if (select.classList.contains("col-type-select")) root.classList.add("custom-select-column");

    const button = document.createElement("button");
    button.type = "button";
    button.className = "custom-select-button";
    button.setAttribute("aria-haspopup", "listbox");
    button.setAttribute("aria-expanded", "false");

    const value = document.createElement("span");
    value.className = "custom-select-value";

    const icon = document.createElement("i");
    icon.className = "bi bi-chevron-down custom-select-icon";
    icon.setAttribute("aria-hidden", "true");

    const list = document.createElement("div");
    list.className = "custom-select-list";
    list.setAttribute("role", "listbox");

    button.append(value, icon);
    root.append(button, list);
    wrapper.appendChild(root);

    const custom = { select, root, button, value, list, highlightedIndex: 0 };
    customSelects.set(select, custom);

    button.addEventListener("click", () => toggleCustomSelect(custom));
    button.addEventListener("keydown", event => handleCustomSelectKeydown(event, custom));
    select.addEventListener("change", () => refreshCustomSelect(select));

    const observer = new MutationObserver(() => refreshCustomSelect(select));
    observer.observe(select, { attributes: true, childList: true, subtree: true, characterData: true });
    custom.observer = observer;

    renderCustomSelectOptions(select);
}

function refreshCustomSelect(select) {
    renderCustomSelectOptions(select);
}

function refreshCustomSelects() {
    document.querySelectorAll(".option-select, .col-type-select").forEach(initCustomSelect);
}

document.addEventListener("click", event => {
    if (activeCustomSelect && !activeCustomSelect.root.contains(event.target)) {
        closeActiveCustomSelect();
    }
});

/* ==========================================================================
   Theme
   ========================================================================== */
function setTheme(theme) {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
    elements.themeIcon.className = theme === "dark" ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";
}
function initTheme() { setTheme(localStorage.getItem(THEME_KEY) || "dark"); }

/* ==========================================================================
   Toast
   ========================================================================== */
function escapeHtml(v) {
    return String(v)
        .replaceAll("&","&amp;").replaceAll("<","&lt;")
        .replaceAll(">","&gt;").replaceAll('"',"&quot;")
        .replaceAll("'","&#039;");
}

function showToast(message, type = "success", icon = "bi-check-circle-fill") {
    elements.appToast.className = "toast align-items-center border-0";
    elements.appToast.classList.add(
        type === "danger" ? "text-bg-danger" :
        type === "warning" ? "text-bg-warning" : "text-bg-success"
    );
    elements.toastBody.innerHTML = `<i class="bi ${icon}"></i><span>${escapeHtml(message)}</span>`;
    appToast.show();
}

/* ==========================================================================
   Status & Progress
   ========================================================================== */
function setStatus(key, tone = "secondary") {
    elements.statusBadge.className = `badge text-bg-${tone}`;
    elements.statusBadge.textContent = t("status_" + key);
}

function updateProgress(percent, label) {
    const p = Math.max(0, Math.min(100, Math.round(percent)));
    elements.progressPanel.classList.remove("d-none");
    elements.progressBar.style.width = `${p}%`;
    elements.progressLabel.textContent = label;
}

function hideProgress() {
    elements.progressPanel.classList.add("d-none");
    elements.progressBar.style.width = "0%";
    elements.progressLabel.textContent = t("progress_reading");
}

/* ==========================================================================
   Drop Zone
   ========================================================================== */
function updateDropZoneState(mode) {
    elements.dropZone.classList.remove("is-valid", "is-invalid");
    if (mode === "valid")   elements.dropZone.classList.add("is-valid");
    if (mode === "invalid") elements.dropZone.classList.add("is-invalid");
}

function getExtension(fileName) {
    return `.${fileName.split(".").pop().toLowerCase()}`;
}

function validateFile(file) {
    if (!VALID_EXTENSIONS.includes(getExtension(file.name)))
        return { valid: false, message: t("dropzone_invalid_ext") };
    if (file.size > MAX_FILE_SIZE)
        return { valid: false, message: t("dropzone_invalid_size") };
    return { valid: true };
}

/* ==========================================================================
   File Reading
   ========================================================================== */
function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error(t("dropzone_read_fail")));
        reader.onprogress = ev => {
            if (ev.lengthComputable) updateProgress((ev.loaded / ev.total) * 100, t("progress_reading"));
        };
        reader.onload = () => resolve(reader.result);
        getExtension(file.name) === ".csv"
            ? reader.readAsText(file, "utf-8")
            : reader.readAsArrayBuffer(file);
    });
}

function readWorkbookFromFile(file, content) {
    try {
        return getExtension(file.name) === ".csv"
            ? XLSX.read(content, { type: "string" })
            : XLSX.read(content, { type: "array" });
    } catch (err) {
        throw new Error(`Erro: ${err.message}`);
    }
}

/* ==========================================================================
   URL Import
   ========================================================================== */
function toggleUrlBar() {
    const open = elements.urlImportBar.classList.toggle("open");
    elements.urlChevron.classList.toggle("open", open);
}

async function fetchFromUrl() {
    const url = elements.urlInput.value.trim();
    if (!url) { showToast(t("url_empty"), "warning", "bi-exclamation-triangle-fill"); return; }

    elements.urlFetchBtn.classList.add("loading");
    elements.urlFetchBtn.querySelector("span").textContent = t("url_fetching");
    setStatus("processing", "info");

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const buffer = await res.arrayBuffer();
        const fileName = url.split("/").pop().split("?")[0] || "imported.csv";
        const ext = getExtension(fileName);
        if (!VALID_EXTENSIONS.includes(ext)) throw new Error(t("dropzone_invalid_ext"));

        const uint8 = new Uint8Array(buffer);
        let wb;
        if (ext === ".csv") {
            const text = new TextDecoder("utf-8").decode(uint8);
            wb = XLSX.read(text, { type: "string" });
        } else {
            wb = XLSX.read(uint8, { type: "array" });
        }

        state.workbooks = [{ fileName, baseName: fileName.replace(/\.[^.]+$/, ""), workbook: wb }];
        state.selectedFileIndex = 0;
        state.columnTypes = {};
        state.searchQuery = "";
        elements.searchInput.value = "";

        populateFileSelector();
        populateSheetSelector();
        refreshSheetPreview();
        setStatus("ready", "success");
        elements.convertButton.disabled = false;
        elements.statFiles.textContent = "1";
        updateDropZoneState("valid");
        showToast(t("url_fetch_success"));
    } catch (err) {
        const msg = err.message.includes("Failed to fetch") || err.message.includes("NetworkError")
            ? t("url_cors")
            : t("url_fetch_fail").replace("{err}", err.message);
        showToast(msg, "danger", "bi-x-octagon-fill");
        setStatus("error", "danger");
        updateDropZoneState("invalid");
    } finally {
        elements.urlFetchBtn.classList.remove("loading");
        elements.urlFetchBtn.querySelector("span").textContent = t("url_fetch");
        hideProgress();
    }
}

/* ==========================================================================
   Workbook / Sheet Selectors
   ========================================================================== */
function getRowsForSheet(wb, sheetName) {
    if (!wb || !sheetName) return [];
    return XLSX.utils.sheet_to_json(wb.workbook.Sheets[sheetName], { defval: "", raw: false });
}

function populateFileSelector() {
    elements.fileSelector.innerHTML = "";
    if (!state.workbooks.length) {
        elements.fileSelector.innerHTML = `<option value="0">${t("opt_file_choose")}</option>`;
        elements.fileSelector.disabled = true;
        return;
    }
    state.workbooks.forEach((entry, i) => {
        const o = document.createElement("option");
        o.value = String(i); o.textContent = entry.fileName;
        o.selected = i === state.selectedFileIndex;
        elements.fileSelector.appendChild(o);
    });
    elements.fileSelector.disabled = false;
}

function populateKeyFieldOptions(rows) {
    const cols = rows.length ? Object.keys(rows[0]) : [];
    elements.keyField.innerHTML = `<option value="">${t("opt_key_auto")}</option>`;
    cols.forEach(c => {
        const o = document.createElement("option");
        o.value = c; o.textContent = c;
        elements.keyField.appendChild(o);
    });
    elements.keyField.disabled = !cols.length;
}

function populateSheetSelector() {
    const wb = state.workbooks[state.selectedFileIndex];
    const names = wb ? wb.workbook.SheetNames : [];
    elements.sheetSelector.innerHTML = "";
    elements.keyField.innerHTML = `<option value="">${t("opt_key_auto")}</option>`;
    if (!names.length) {
        elements.sheetSelector.innerHTML = `<option value="">${t("opt_sheet_choose")}</option>`;
        elements.sheetSelector.disabled = true;
        elements.keyField.disabled = true;
        return;
    }
    names.forEach((name, i) => {
        const o = document.createElement("option");
        o.value = name; o.textContent = name; o.selected = i === 0;
        elements.sheetSelector.appendChild(o);
    });
    state.selectedSheetName = names[0];
    elements.sheetSelector.disabled = false;
    populateKeyFieldOptions(getRowsForSheet(wb, names[0]));
}

function updateStats(rows, sheetName) {
    elements.statRows.textContent = String(rows.length);
    elements.statCols.textContent = String(rows.length ? Object.keys(rows[0]).length : 0);
    elements.statSheet.textContent = sheetName || "-";
    elements.fileSummary.textContent = state.workbooks.map(e => e.fileName).join(", ");
}

/* ==========================================================================
   Preview Table
   ========================================================================== */
const COL_TYPES = ["text", "number", "boolean", "date"];

function colTypeOptions(colName) {
    return COL_TYPES.map(type => {
        const label = t("col_type_" + type);
        const sel = state.columnTypes[colName] === type ? " selected" : "";
        return `<option value="${type}"${sel}>${label}</option>`;
    }).join("");
}

function renderEmptyPreview() {
    elements.previewTable.innerHTML =
        `<thead><tr><th>${t("preview_no_data_hdr")}</th></tr></thead>` +
        `<tbody><tr><td class="text-soft">${t("preview_no_data_body")}</td></tr></tbody>`;
    elements.statRows.textContent = "0";
    elements.statCols.textContent = "0";
    elements.statSheet.textContent = "-";
    elements.searchCount.textContent = "";
}

function getFilteredRows() {
    const q = state.searchQuery.trim().toLowerCase();
    if (!q) return state.previewRows;
    return state.previewRows.filter(row =>
        state.previewColumns.some(col => String(row[col] ?? "").toLowerCase().includes(q))
    );
}

function validateCell(value, colName) {
    const type = state.columnTypes[colName] || "text";
    if (value === "" || value == null) return true; // empty cells are ok
    switch (type) {
        case "number":  return !isNaN(Number(value));
        case "boolean": return /^(true|false|yes|no|1|0|sim|não|nao)$/i.test(String(value).trim());
        case "date":    return !isNaN(Date.parse(String(value)));
        default:        return true;
    }
}

function renderPreviewTable() {
    if (!state.previewColumns.length) { renderEmptyPreview(); return; }

    const filtered = getFilteredRows();
    const q = state.searchQuery.trim().toLowerCase();
    if (q) {
        elements.searchCount.textContent =
            t("search_results").replace("{n}", filtered.length).replace("{total}", state.previewRows.length);
    } else {
        elements.searchCount.textContent = "";
    }

    const thead = `<thead><tr>${state.previewColumns.map(col => `
        <th>
            <div class="th-inner">
                <span class="th-label">${escapeHtml(col)}</span>
                <div class="select-wrapper column-select-wrapper">
                    <select class="col-type-select" data-col="${escapeHtml(col)}">${colTypeOptions(col)}</select>
                </div>
            </div>
        </th>`).join("")}</tr></thead>`;

    const highlight = (val) => {
        if (!q) return escapeHtml(val);
        const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`, "gi");
        return escapeHtml(val).replace(re, `<mark style="background:rgba(245,158,11,0.35);color:inherit;border-radius:2px;">$1</mark>`);
    };

    const tbody = filtered.map((row, ri) => {
        const originalIndex = state.previewRows.indexOf(row);
        const cells = state.previewColumns.map(col => {
            const val = row[col] == null ? "" : String(row[col]);
            const invalid = !validateCell(val, col) ? " cell-invalid" : "";
            return `<td contenteditable="true" data-row="${originalIndex}" data-column="${escapeHtml(col)}" class="${invalid}">${highlight(val)}</td>`;
        }).join("");
        return `<tr>${cells}</tr>`;
    }).join("");

    elements.previewTable.innerHTML = `${thead}<tbody>${tbody}</tbody>`;

    // Count and notify invalid cells
    const invalidCount = elements.previewTable.querySelectorAll(".cell-invalid").length;
    if (invalidCount > 0) {
        showToast(t("validation_error").replace("{n}", invalidCount), "warning", "bi-exclamation-triangle-fill");
    }

    // Re-attach type selector listeners
    elements.previewTable.querySelectorAll(".col-type-select").forEach(sel => {
        sel.addEventListener("change", e => {
            state.columnTypes[e.target.dataset.col] = e.target.value;
            renderPreviewTable();
        });
    });
    refreshCustomSelects();
}

function refreshSheetPreview() {
    const wb = state.workbooks[state.selectedFileIndex];
    if (!wb) { renderEmptyPreview(); return; }
    const sheetName = elements.sheetSelector.value || wb.workbook.SheetNames[0];
    const rows = getRowsForSheet(wb, sheetName);
    state.selectedSheetName = sheetName;
    state.previewRows = rows.slice(0, 10).map(r => ({ ...r }));
    state.previewColumns = rows.length ? Object.keys(rows[0]) : [];
    // Reset column types if sheet changes
    state.columnTypes = {};
    populateKeyFieldOptions(rows);
    renderPreviewTable();
    updateStats(rows, sheetName);
}

/* ==========================================================================
   Data Cleansing
   ========================================================================== */
function toCamelCase(str) {
    return str.replace(/[\s_-]+(.)/g, (_, c) => c.toUpperCase())
              .replace(/^(.)/, c => c.toLowerCase());
}
function toSnakeCase(str) {
    return str.replace(/([A-Z])/g, "_$1").replace(/[\s-]+/g, "_")
              .replace(/__+/g, "_").replace(/^_/, "").toLowerCase();
}
function toUpperCase(str) { return str.toUpperCase(); }

function applyHeaderCase(transformFn) {
    if (!state.previewColumns.length) return;
    const mapping = {};
    const newCols = state.previewColumns.map(col => {
        const newCol = transformFn(col);
        mapping[col] = newCol;
        return newCol;
    });
    state.previewColumns = newCols;
    state.previewRows = state.previewRows.map(row => {
        const newRow = {};
        Object.entries(row).forEach(([k, v]) => { newRow[mapping[k] ?? k] = v; });
        return newRow;
    });
    // Also update the workbook in memory
    const wb = state.workbooks[state.selectedFileIndex];
    if (wb) {
        const sheet = wb.workbook.Sheets[state.selectedSheetName];
        if (sheet) {
            const rows = XLSX.utils.sheet_to_json(sheet, { defval: "", raw: false });
            const mapped = rows.map(row => {
                const newRow = {};
                Object.entries(row).forEach(([k, v]) => { newRow[mapping[k] ?? transformFn(k)] = v; });
                return newRow;
            });
            const newSheet = XLSX.utils.json_to_sheet(mapped);
            wb.workbook.Sheets[state.selectedSheetName] = newSheet;
        }
    }
    state.columnTypes = {};
    renderPreviewTable();
    showToast(t("clean_case_done"));
}

function trimAllCells() {
    if (!state.previewRows.length) return;
    state.previewRows = state.previewRows.map(row => {
        const newRow = {};
        Object.entries(row).forEach(([k, v]) => { newRow[k] = typeof v === "string" ? v.trim() : v; });
        return newRow;
    });
    // Update workbook too
    const wb = state.workbooks[state.selectedFileIndex];
    if (wb) {
        const sheet = wb.workbook.Sheets[state.selectedSheetName];
        if (sheet) {
            const rows = XLSX.utils.sheet_to_json(sheet, { defval: "", raw: false });
            const trimmed = rows.map(row => {
                const nr = {};
                Object.entries(row).forEach(([k, v]) => { nr[k] = typeof v === "string" ? v.trim() : v; });
                return nr;
            });
            wb.workbook.Sheets[state.selectedSheetName] = XLSX.utils.json_to_sheet(trimmed);
        }
    }
    renderPreviewTable();
    showToast(t("clean_trim_done"));
}

function isNonEmptyRow(row) {
    return Object.values(row).some(v => v !== "" && v != null);
}

function removeEmptyRows() {
    const wb = state.workbooks[state.selectedFileIndex];
    if (!wb || !state.selectedSheetName) return;

    const sheet = wb.workbook.Sheets[state.selectedSheetName];
    if (!sheet) return;

    const rows = XLSX.utils.sheet_to_json(sheet, { defval: "", raw: false });
    const before = rows.length;
    const filtered = rows.filter(isNonEmptyRow);
    const removed = before - filtered.length;

    if (removed === 0) {
        showToast(t("clean_empty_none"), "warning", "bi-exclamation-triangle-fill");
        return;
    }

    wb.workbook.Sheets[state.selectedSheetName] = XLSX.utils.json_to_sheet(filtered);
    state.previewRows = filtered.slice(0, 10).map(r => ({ ...r }));
    state.previewColumns = filtered.length ? Object.keys(filtered[0]) : state.previewColumns;
    populateKeyFieldOptions(filtered);
    renderPreviewTable();
    updateStats(filtered, state.selectedSheetName);
    showToast(t("clean_empty_done").replace("{n}", removed));
}

/* ==========================================================================
   JSON Build
   ========================================================================== */
function setByPath(target, path, value) {
    const keys = path.split(".");
    let cur = target;
    keys.forEach((k, i) => {
        if (i === keys.length - 1) { cur[k] = value; return; }
        if (typeof cur[k] !== "object" || cur[k] === null || Array.isArray(cur[k])) cur[k] = {};
        cur = cur[k];
    });
}

function applyStructure(row, mode) {
    if (mode !== "nested") return { ...row };
    const nested = {};
    Object.entries(row).forEach(([k, v]) => {
        k.includes(".") ? setByPath(nested, k, v) : (nested[k] = v);
    });
    return nested;
}

function applyContainer(rows) {
    if (elements.containerMode.value === "array") return rows;
    const keyField = elements.keyField.value;
    return rows.reduce((acc, row, i) => {
        const rawKey = keyField ? row[keyField] : i;
        const key = rawKey === "" || rawKey == null ? `item_${i}` : String(rawKey);
        acc[key] = row; return acc;
    }, {});
}

function decorateOutput(payload, meta) {
    return elements.apiEnvelope.checked ? { meta, data: payload } : payload;
}

function getActiveRows() {
    // Use filtered rows for conversion if search is active
    if (state.searchQuery.trim()) return getFilteredRows();
    return state.previewRows;
}

function buildSheetPayload(wb, sheetName, usePreview = false) {
    const rows = getRowsForSheet(wb, sheetName);
    const mergedRows = usePreview && sheetName === state.selectedSheetName
        ? rows.map((row, i) => i < state.previewRows.length ? { ...row, ...state.previewRows[i] } : row)
        : rows;

    // Apply search filter
    const activeRows = state.searchQuery.trim()
        ? mergedRows.filter(row =>
            Object.values(row).some(v => String(v ?? "").toLowerCase().includes(state.searchQuery.toLowerCase()))
          )
        : mergedRows;

    return activeRows.map(row => applyStructure(row, elements.structureMode.value));
}

/* ==========================================================================
   Serializers
   ========================================================================== */
function toYAML(data) {
    function serializeValue(v, indent) {
        if (Array.isArray(v)) {
            if (!v.length) return "[]";
            return "\n" + v.map(item => `${indent}- ${serializeValue(item, indent + "  ")}`).join("\n");
        }
        if (v !== null && typeof v === "object") {
            return "\n" + Object.entries(v).map(([k, val]) =>
                `${indent}${k}: ${serializeValue(val, indent + "  ")}`
            ).join("\n");
        }
        if (typeof v === "string") {
            if (v.includes("\n") || v.includes(":") || v.includes("#") || v === "")
                return `"${v.replace(/"/g, '\\"')}"`;
            return v;
        }
        return String(v);
    }

    if (Array.isArray(data)) {
        return data.map(item => {
            if (typeof item === "object" && item !== null) {
                return "- " + Object.entries(item).map(([k, v], i) =>
                    (i === 0 ? "" : "  ") + `${k}: ${serializeValue(v, "  ")}`
                ).join("\n  ");
            }
            return `- ${item}`;
        }).join("\n");
    }
    if (typeof data === "object" && data !== null) {
        return Object.entries(data).map(([k, v]) =>
            `${k}: ${serializeValue(v, "  ")}`
        ).join("\n");
    }
    return String(data);
}

function toXML(data, rootTag = "root", itemTag = "item") {
    function serialize(v, tag) {
        if (Array.isArray(v)) {
            return v.map(item => serialize(item, itemTag)).join("\n");
        }
        if (v !== null && typeof v === "object") {
            const inner = Object.entries(v)
                .map(([k, val]) => serialize(val, k.replace(/[^a-zA-Z0-9_.-]/g, "_")))
                .join("\n  ");
            return `<${tag}>\n  ${inner}\n</${tag}>`;
        }
        const escaped = String(v ?? "")
            .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
        return `<${tag}>${escaped}</${tag}>`;
    }
    return `<?xml version="1.0" encoding="UTF-8"?>\n<${rootTag}>\n${
        Array.isArray(data)
            ? data.map(item => "  " + serialize(item, itemTag).replace(/\n/g, "\n  ")).join("\n")
            : Object.entries(data).map(([k, v]) => "  " + serialize(v, k).replace(/\n/g, "\n  ")).join("\n")
    }\n</${rootTag}>`;
}

function toMarkdownTable(data) {
    const rows = Array.isArray(data) ? data : Object.values(data);
    if (!rows.length) return "| (empty) |\n|---|";
    const cols = [...new Set(rows.flatMap(r => Object.keys(r)))];
    const header = "| " + cols.join(" | ") + " |";
    const sep    = "| " + cols.map(() => "---").join(" | ") + " |";
    const body   = rows.map(row =>
        "| " + cols.map(c => String(row[c] ?? "").replace(/\|/g, "\\|")).join(" | ") + " |"
    ).join("\n");
    return [header, sep, body].join("\n");
}

function serializeOutput(data, format) {
    switch (format) {
        case "yaml":     return toYAML(data);
        case "xml":      return toXML(data);
        case "markdown": return toMarkdownTable(data);
        default: {
            const spacing = elements.minifyOutput.checked ? 0 : elements.prettyPrint.checked ? 2 : 0;
            return JSON.stringify(data, null, spacing);
        }
    }
}

function formatExtension(format) {
    return { json: "json", yaml: "yaml", xml: "xml", markdown: "md" }[format] ?? "json";
}

function formatHighlightLang(format) {
    return { json: "json", yaml: "yaml", xml: "xml", markdown: "markdown" }[format] ?? "json";
}

/* ==========================================================================
   Output Panel
   ========================================================================== */
function highlightElement(el, lang) {
    el.removeAttribute("data-highlighted");
    el.className = `language-${lang}`;
    hljs.highlightElement(el);
}

function updateOutput(str, filename) {
    state.lastOutput = str;
    state.lastDownloadName = filename;
    elements.output.textContent = str || `{\n  "status": "${t("output_status_empty")}"\n}`;
    highlightElement(elements.output, formatHighlightLang(state.lastFormat));
    elements.copyButton.disabled = !str;
    elements.downloadButton.disabled = !str;
    if (str) updateSnippet();
}

function setActiveFormat(format) {
    state.lastFormat = format;
    document.querySelectorAll(".format-pill").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.format === format);
    });
}

/* ==========================================================================
   Convert
   ========================================================================== */
function convertToJson() {
    if (!state.workbooks.length) {
        showToast(t("toast_load_file_first"), "warning", "bi-exclamation-triangle-fill");
        return;
    }

    const wb = state.workbooks[state.selectedFileIndex];
    const targetSheets = elements.allSheetsMode.checked
        ? wb.workbook.SheetNames : [elements.sheetSelector.value];

    const result = elements.allSheetsMode.checked
        ? targetSheets.reduce((acc, name) => {
            const rows = buildSheetPayload(wb, name, true);
            acc[name] = decorateOutput(applyContainer(rows), {
                rows: rows.length,
                columns: rows[0] ? Object.keys(rows[0]).length : 0,
                sheet: name, file: wb.fileName
            });
            return acc;
        }, {})
        : (() => {
            const rows = buildSheetPayload(wb, targetSheets[0], true);
            return decorateOutput(applyContainer(rows), {
                rows: rows.length, columns: rows[0] ? Object.keys(rows[0]).length : 0,
                sheet: targetSheets[0], file: wb.fileName
            });
        })();

    state.lastPayload = result;
    const serialized = serializeOutput(result, state.lastFormat);
    updateOutput(serialized, wb.baseName);
    showToast(t("toast_json_success"));
}

/* ==========================================================================
   Download / Copy
   ========================================================================== */
function downloadTextFile(content, filename, mime) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
}

function downloadOutput() {
    if (!state.lastOutput) {
        showToast(t("toast_no_json_download"), "warning", "bi-exclamation-triangle-fill"); return;
    }
    const ext = formatExtension(state.lastFormat);
    const mime = { json: "application/json", yaml: "text/yaml", xml: "application/xml", markdown: "text/markdown" }[state.lastFormat] ?? "text/plain";
    downloadTextFile(state.lastOutput, `${state.lastDownloadName}.${ext}`, mime);
    showToast(t("toast_json_downloaded"));
}

async function copyOutput() {
    if (!state.lastOutput) return;
    try {
        await navigator.clipboard.writeText(state.lastOutput);
        showToast(t("toast_copied"));
    } catch {
        showToast(t("toast_copy_fail"), "danger", "bi-x-octagon-fill");
    }
}

function toggleOutputExpand() {
    elements.outputWrapper.classList.toggle("is-maximized");
    const max = elements.outputWrapper.classList.contains("is-maximized");
    elements.expandButton.innerHTML = max
        ? `<i class="bi bi-fullscreen-exit"></i><span data-i18n="btn_collapse">${t("btn_collapse")}</span>`
        : `<i class="bi bi-arrows-fullscreen"></i><span data-i18n="btn_expand">${t("btn_expand")}</span>`;
    elements.outputCloseButton.setAttribute("aria-label", t("btn_collapse"));
    if (max) elements.outputCloseButton.focus();
}

/* ==========================================================================
   Integration Snippets
   ========================================================================== */
function truncateSnippetText(text, max = 400) {
    return text.length > max ? `${text.slice(0, max)}\n// ...` : text;
}

function escapeTemplateLiteral(str) {
    return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
}

function escapePythonTriple(str) {
    return str.replace(/\\/g, "\\\\").replace(/"""/g, '\\"""');
}

function escapeShellSingleQuoted(str) {
    return str.replace(/'/g, "'\"'\"'");
}

function buildSnippet(lang) {
    if (state.lastPayload == null || !state.lastOutput) return t("snippet_no_data");

    const format = state.lastFormat;
    const serialized = state.lastOutput;
    const payload = state.lastPayload;
    const contentType = {
        json: "application/json",
        yaml: "text/yaml",
        xml: "application/xml",
        markdown: "text/markdown",
    }[format] ?? "application/json";
    const bodySample = truncateSnippetText(serialized);
    const jsonSample = truncateSnippetText(JSON.stringify(payload, null, 2), 300);

    switch (lang) {
        case "fetch":
            if (format === "json") {
                return `// JavaScript — Fetch API
const data = ${jsonSample};

fetch("https://your-api.com/endpoint", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
})
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));`;
            }
            return `// JavaScript — Fetch API
const body = \`${escapeTemplateLiteral(bodySample)}\`;

fetch("https://your-api.com/endpoint", {
  method: "POST",
  headers: { "Content-Type": "${contentType}" },
  body
})
  .then(res => res.text())
  .then(text => console.log(text))
  .catch(err => console.error(err));`;

        case "axios":
            if (format === "json") {
                return `// JavaScript — Axios
import axios from "axios";

const data = ${jsonSample};

axios.post("https://your-api.com/endpoint", data, {
  headers: { "Content-Type": "application/json" }
})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));`;
            }
            return `// JavaScript — Axios
import axios from "axios";

const body = \`${escapeTemplateLiteral(bodySample)}\`;

axios.post("https://your-api.com/endpoint", body, {
  headers: { "Content-Type": "${contentType}" }
})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));`;

        case "python":
            if (format === "json") {
                return `# Python — requests
import requests

data = ${jsonSample}

response = requests.post(
    "https://your-api.com/endpoint",
    json=data,
    headers={"Content-Type": "application/json"}
)
print(response.status_code, response.json())`;
            }
            return `# Python — requests
import requests

body = """${escapePythonTriple(bodySample)}"""

response = requests.post(
    "https://your-api.com/endpoint",
    data=body.encode("utf-8"),
    headers={"Content-Type": "${contentType}"}
)
print(response.status_code, response.text)`;

        case "curl":
            if (format === "json") {
                return `# cURL
curl -X POST "https://your-api.com/endpoint" \\
  -H "Content-Type: application/json" \\
  -d '${escapeShellSingleQuoted(jsonSample)}'`;
            }
            return `# cURL
curl -X POST "https://your-api.com/endpoint" \\
  -H "Content-Type: ${contentType}" \\
  -d '${escapeShellSingleQuoted(bodySample)}'`;

        default:
            return t("snippet_no_data");
    }
}

function updateSnippet() {
    const code = buildSnippet(state.activeSnippetLang);
    elements.snippetOutput.textContent = code;
    const langMap = { fetch: "javascript", axios: "javascript", python: "python", curl: "bash" };
    highlightElement(elements.snippetOutput, langMap[state.activeSnippetLang] || "javascript");
}

async function copySnippet() {
    const text = elements.snippetOutput.textContent;
    if (!text || text === t("snippet_no_data")) return;
    try {
        await navigator.clipboard.writeText(text);
        showToast(t("toast_copied"));
    } catch {
        showToast(t("toast_copy_fail"), "danger", "bi-x-octagon-fill");
    }
}

/* ==========================================================================
   JSON → Excel
   ========================================================================== */
function loadOutputIntoEditor() {
    // Always put raw JSON into editor (not YAML/XML/MD)
    if (state.lastOutput && state.lastFormat !== "json") {
        showToast(t("toast_editor_loaded") + " (JSON only)", "warning", "bi-exclamation-triangle-fill");
    }
    elements.outputEditor.value = state.lastOutput;
    showToast(t("toast_editor_loaded"));
}

function normalizeJsonInput(input) {
    const parsed = JSON.parse(input);
    if (Array.isArray(parsed)) return parsed;
    if (parsed?.data && Array.isArray(parsed.data)) return parsed.data;
    if (parsed && typeof parsed === "object") return Object.values(parsed);
    throw new Error(t("toast_invalid_json"));
}

function jsonToExcel() {
    const raw = elements.outputEditor.value.trim();
    if (!raw) { showToast(t("toast_paste_valid_json"), "warning", "bi-exclamation-triangle-fill"); return; }
    try {
        const normalized = normalizeJsonInput(raw);
        const sheet = XLSX.utils.json_to_sheet(normalized);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, sheet, "Dados");
        XLSX.writeFile(wb, "json-convertido.xlsx");
        showToast(t("toast_excel_generated"));
    } catch (err) {
        showToast(t("toast_convert_err").replace("{err}", err.message), "danger", "bi-x-octagon-fill");
    }
}

/* ==========================================================================
   Reset
   ========================================================================== */
function resetState(feedback = true) {
    state.workbooks = []; state.selectedFileIndex = 0;
    state.selectedSheetName = ""; state.lastOutput = "";
    state.lastPayload = null;
    state.lastDownloadName = "output"; state.previewRows = [];
    state.previewColumns = []; state.columnTypes = {};
    state.searchQuery = ""; state.lastFormat = "json";

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
    elements.searchInput.value = "";
    elements.searchCount.textContent = "";
    elements.urlInput.value = "";
    elements.statFiles.textContent = "0";

    setActiveFormat("json");
    renderEmptyPreview();
    updateOutput("", "output");
    updateDropZoneState();
    setStatus("waiting", "secondary");
    elements.snippetOutput.textContent = t("snippet_no_data");
    highlightElement(elements.snippetOutput, "javascript");

    if (feedback) showToast(t("toast_cleared"));
}

/* ==========================================================================
   File Loading
   ========================================================================== */
function syncPrettyMinify(src) {
    if (src === "pretty" && elements.prettyPrint.checked) elements.minifyOutput.checked = false;
    if (src === "minify" && elements.minifyOutput.checked) elements.prettyPrint.checked = false;
}

async function handleFiles(fileList) {
    const files = Array.from(fileList || []);
    if (!files.length) return;

    resetState(false);
    elements.statFiles.textContent = String(files.length);
    setStatus("processing", "info");

    for (const file of files) {
        const v = validateFile(file);
        if (!v.valid) {
            updateDropZoneState("invalid");
            hideProgress();
            setStatus("error", "danger");
            showToast(v.message, "danger", "bi-x-octagon-fill");
            return;
        }
    }
    updateDropZoneState("valid");

    try {
        const loaded = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            updateProgress((i / files.length) * 100, t("progress_preparing").replace("{filename}", file.name));
            const content = await readFile(file);
            updateProgress(((i + 0.6) / files.length) * 100, t("progress_interpreting").replace("{filename}", file.name));
            const wb = readWorkbookFromFile(file, content);
            loaded.push({ fileName: file.name, baseName: file.name.replace(/\.[^.]+$/, ""), workbook: wb });
            updateProgress(((i + 1) / files.length) * 100, t("progress_loaded").replace("{filename}", file.name));
        }
        state.workbooks = loaded;
        state.selectedFileIndex = 0;
        state.columnTypes = {};
        populateFileSelector();
        populateSheetSelector();
        refreshSheetPreview();
        setStatus("ready", "success");
        elements.convertButton.disabled = false;
        showToast(files.length > 1 ? t("toast_files_loaded") : t("toast_file_loaded"));
    } catch (err) {
        updateDropZoneState("invalid");
        setStatus("error", "danger");
        showToast(err.message, "danger", "bi-x-octagon-fill");
    } finally {
        hideProgress();
    }
}

/* ==========================================================================
   Event Listeners
   ========================================================================== */

// Drop Zone
elements.dropZone.addEventListener("dragover",  e => { e.preventDefault(); elements.dropZone.classList.add("is-dragover"); });
elements.dropZone.addEventListener("dragleave", () => elements.dropZone.classList.remove("is-dragover"));
elements.dropZone.addEventListener("drop", e => {
    e.preventDefault();
    elements.dropZone.classList.remove("is-dragover");
    handleFiles(e.dataTransfer.files);
});
elements.inputFile.addEventListener("change", e => handleFiles(e.target.files));

// URL Import
elements.urlImportToggle.addEventListener("click", toggleUrlBar);
elements.urlFetchBtn.addEventListener("click", fetchFromUrl);
elements.urlInput.addEventListener("keydown", e => { if (e.key === "Enter") fetchFromUrl(); });

// Selectors
elements.fileSelector.addEventListener("change", e => {
    state.selectedFileIndex = Number(e.target.value) || 0;
    state.columnTypes = {};
    populateSheetSelector();
    refreshSheetPreview();
});
elements.sheetSelector.addEventListener("change", () => { state.columnTypes = {}; refreshSheetPreview(); });

// Main Actions
elements.convertButton.addEventListener("click", convertToJson);
elements.downloadButton.addEventListener("click", downloadOutput);
elements.copyButton.addEventListener("click", copyOutput);
elements.expandButton.addEventListener("click", toggleOutputExpand);
elements.outputCloseButton.addEventListener("click", toggleOutputExpand);
elements.resetButton.addEventListener("click", () => resetState(true));
elements.jsonToExcelButton.addEventListener("click", loadOutputIntoEditor);
elements.downloadExcelButton.addEventListener("click", jsonToExcel);
elements.loadOutputToEditor.addEventListener("click", loadOutputIntoEditor);

// Format Pills
elements.formatPills.addEventListener("click", e => {
    const pill = e.target.closest(".format-pill");
    if (!pill) return;
    setActiveFormat(pill.dataset.format);
    if (state.lastOutput) {
        // Re-serialize from current workbook data
        convertToJson();
    }
});

// Search
elements.searchInput.addEventListener("input", e => {
    state.searchQuery = e.target.value;
    renderPreviewTable();
});

// Data Cleansing
elements.cleanTrim.addEventListener("click",  trimAllCells);
elements.cleanCamel.addEventListener("click", () => applyHeaderCase(toCamelCase));
elements.cleanSnake.addEventListener("click", () => applyHeaderCase(toSnakeCase));
elements.cleanUpper.addEventListener("click", () => applyHeaderCase(toUpperCase));
elements.cleanEmpty.addEventListener("click", removeEmptyRows);

// Table cell edit
elements.previewTable.addEventListener("input", e => {
    const td = e.target;
    if (!(td instanceof HTMLElement) || td.tagName !== "TD") return;
    const ri = Number(td.dataset.row);
    const col = td.dataset.column;
    if (isNaN(ri) || !col || !state.previewRows[ri]) return;
    state.previewRows[ri][col] = td.textContent || "";
    // Validate live
    const valid = validateCell(td.textContent || "", col);
    td.classList.toggle("cell-invalid", !valid);
});

// Column type selectors (delegated — handled in renderPreviewTable)
// Integration snippets
document.querySelectorAll(".snippet-lang-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".snippet-lang-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.activeSnippetLang = btn.dataset.lang;
        updateSnippet();
    });
});
elements.copySnippetBtn.addEventListener("click", copySnippet);

// Theme toggle
elements.themeToggle.addEventListener("click", () => {
    setTheme(document.documentElement.getAttribute("data-bs-theme") === "dark" ? "light" : "dark");
});

// Language
elements.languageSelect.addEventListener("change", e => setLanguage(e.target.value));

// Options
elements.prettyPrint.addEventListener("change", () => syncPrettyMinify("pretty"));
elements.minifyOutput.addEventListener("change", () => syncPrettyMinify("minify"));
elements.allSheetsMode.addEventListener("change", () => {
    elements.sheetSelector.disabled = elements.allSheetsMode.checked || !state.workbooks.length;
    refreshCustomSelect(elements.sheetSelector);
});

// Keyboard shortcuts
window.addEventListener("keydown", e => {
    if (e.key === "Escape" && activeCustomSelect) closeActiveCustomSelect(true);
    if (e.key === "Escape" && elements.outputWrapper.classList.contains("is-maximized")) toggleOutputExpand();
});

/* ==========================================================================
   Init
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initLanguage();
    updateOutput("", "output");
    hideProgress();
    renderEmptyPreview();

    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => new bootstrap.Tooltip(el));

    // Snippet placeholder
    elements.snippetOutput.textContent = t("snippet_no_data");
    highlightElement(elements.snippetOutput, "javascript");
    refreshCustomSelects();
});
