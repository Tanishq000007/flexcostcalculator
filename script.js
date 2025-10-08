document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("calcBtn").addEventListener("click", calculate);
  document.getElementById("downloadPdfBtn").addEventListener("click", downloadPDF);
});

function calculate() {
  const name = document.getElementById("customerName").value.trim();
  const date = document.getElementById("quoteDate").value;
  const width = parseFloat(document.getElementById("width").value);
  const height = parseFloat(document.getElementById("height").value);
  const quantity = parseInt(document.getElementById("quantity").value || 1);

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
  const addonsName = eyeletsChecked ? "Eyelets" : "None";
  const addonsValue = 0;

  const designing = parseFloat(document.getElementById("designing").value || 0);
  const remark = document.getElementById("remark").value;

  if (!name || !date || !width || !height) {
    alert("Please fill all required fields!");
    return;
  }

  const area = width * height;
  const materialCost = area * materialValue;
  const frameCost = area * frameValue;
  const laminationCost = area * laminationValue;
  const subtotal = (materialCost + frameCost + laminationCost + addonsValue + designing) * quantity;

  const quoteHTML = `
    <div id="pdfContent" style="padding:10px;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <h2>Quotation</h2>
        <img src="logo.png" alt="Logo" style="width:100px; height:auto;">
      </div>

      <p><strong>Customer:</strong> ${name}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Size:</strong> ${width}" × ${height}" (${area.toFixed(0)} sq.in)</p>
      <p><strong>Quantity:</strong> ${quantity}</p>

      <table>
        <tr><th>Description</th><th>Amount (₹)</th></tr>
        <tr><td>Material (${materialName})</td><td>${(materialCost*quantity).toFixed(2)}</td></tr>
        <tr><td>Frame (${frameName})</td><td>${(frameCost*quantity).toFixed(2)}</td></tr>
        <tr><td>Lamination (${laminationName})</td><td>${(laminationCost*quantity).toFixed(2)}</td></tr>
        <tr><td>Add-ons (${addonsName})</td><td>${(addonsValue*quantity).toFixed(2)}</td></tr>
        <tr><td>Designing Charges</td><td>${(designing*quantity).toFixed(2)}</td></tr>
        <tr><td><strong>Total</strong></td><td><strong>${subtotal.toFixed(2)}</strong></td></tr>
      </table>

      ${remark ? `<p><strong>Remark:</strong> ${remark}</p>` : ''}
      <p style="font-style:italic; margin-top:10px;">Note: Rates valid for 15 days from quotation date.</p>

      <div class="footer">
        <strong>Contact:</strong><br>
        Sumit Mittal, Namit Mittal<br>
        9368885855, 9359995855<br>
        vimalpress@gmail.com<br>
        vimalpress.com
      </div>

      <div class="signature">
        ___________________________<br>Authorized Signature
      </div>
    </div>
  `;

  document.getElementById("quotation").innerHTML = quoteHTML;
}

function downloadPDF() {
  const element = document.getElementById("pdfContent");
  if (!element || !element.innerHTML.trim()) {
    alert("Please calculate the quotation first!");
    return;
  }

  html2pdf().set({
    margin: 10,
    filename: `quotation.pdf`,
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  }).from(element).save();
}

