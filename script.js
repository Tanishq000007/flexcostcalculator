document.getElementById("calcBtn").addEventListener("click", function() {
    const name = document.getElementById("customerName").value.trim();
    const date = document.getElementById("quoteDate").value;
    const width = parseFloat(document.getElementById("width").value) || 0;
    const height = parseFloat(document.getElementById("height").value) || 0;
    const quantity = parseInt(document.getElementById("quantity").value) || 1;

    const materialDropdown = document.getElementById("material");
    const materialValue = parseFloat(materialDropdown.value);
    const materialName = materialDropdown.options[materialDropdown.selectedIndex].text;

    const frameDropdown = document.getElementById("frame");
    const frameValue = parseFloat(frameDropdown.value);
    const frameName = frameDropdown.options[frameDropdown.selectedIndex].text;

    const laminationDropdown = document.getElementById("lamination");
    const laminationValue = parseFloat(laminationDropdown.value);
    const laminationName = laminationDropdown.options[laminationDropdown.selectedIndex].text;

    const eyeletsChecked = document.getElementById("eyelets").checked;
    const addonsValue = 0; // Eyelets are free
    const addonsName = eyeletsChecked ? "Eyelets" : "None";

    const designing = parseFloat(document.getElementById("designing").value) || 0;
    const remark = document.getElementById("remark").value;

    if(!name || !date || width <= 0 || height <=0){
        alert("Please fill all required fields with valid numbers!");
        return;
    }

    const area = width * height;
    const materialCost = area * materialValue;
    const frameCost = area * frameValue;
    const laminationCost = area * laminationValue;
    const subtotal = (materialCost + frameCost + laminationCost + addonsValue + designing) * quantity;

    let html = `
        <h2>Quotation</h2>
        <p><strong>Customer:</strong> ${name}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Size:</strong> ${width}" × ${height}" (${area.toFixed(0)} sq.in)</p>
        <p><strong>Quantity:</strong> ${quantity}</p>

        <table style="width:100%; border-collapse: collapse;" border="1">
        <tr><th>Description</th><th>Amount (₹)</th></tr>
        <tr><td>Material (${materialName})</td><td>${(materialCost*quantity).toFixed(2)}</td></tr>
        <tr><td>Frame (${frameName})</td><td>${(frameCost*quantity).toFixed(2)}</td></tr>
        <tr><td>Lamination (${laminationName})</td><td>${(laminationCost*quantity).toFixed(2)}</td></tr>
        <tr><td>Add-ons (${addonsName})</td><td>${(addonsValue*quantity).toFixed(2)}</td></tr>
        <tr><td>Designing Charges</td><td>${(designing*quantity).toFixed(2)}</td></tr>
        <tr><td><strong>Total</strong></td><td><strong>${subtotal.toFixed(2)}</strong></td></tr>
        </table>

        ${remark ? `<p><strong>Remark:</strong> ${remark}</p>` : ''}
    `;

    document.getElementById("quotation").innerHTML = html;
});
