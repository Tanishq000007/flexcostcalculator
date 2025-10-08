// Event listener for Calculate button
document.getElementById("calcBtn").addEventListener("click", calculate);

let currentCustomerName = "quotation"; // default

// Safe number parser, handles checkboxes too
function getNumber(id) {
  const element = document.getElementById(id);
  if (!element) return 0;

  if (element.type === "checkbox") {
    return element.checked ? parseFloat(element.value) || 0 : 0;
  }

  const val = parseFloat(element.value);
  return isNaN(val) || val < 0 ? 0 : val;
}

// Calculate quotation
function calculate() {
  const name = document.getElementById("customerName").value.trim();
  const date = document.getElementById("quoteDate").value;
  const width = getNumber("width");
  const height = getNumber("height");
  const quantity = Math.max(1, parseInt(document.getElementById("quantity").value || 1));

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
  const addonsValue = getNumber("eyelets");

  const designing = getNumber("designing");
  const remark = document.getElementById("remark").value;

  if (!name || !date || width <= 0 || height <= 0) {
    alert("Please fill all required fields with valid numbers!");
    return;
  }

  currentCustomerName = name.replace(/[^\w]/g, "_");

  const area = width * height;
  const materialCost = area * materialValue;
  const frameCost = area * frameValue;
  const laminationCost = area * laminationValue;
  const subtotal = (materialCost + frameCost + laminationCost + addonsValue + designing) * quantity;

  const quoteHTML = `
    <div style="padding:10px; background:#fff; color:#000;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <h2>Quotation</h2>
        <img src="logo.png" alt="Logo" style="width:100px; height:auto;">
      </div>

      <p><strong>Customer:</strong> ${name}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Size:</strong> ${width}" × ${height}" (${area.toFixed(0)} sq.in)</p>
      <p><strong>Quantity:</strong> ${quantity}</p>

      <table style="width:100%; border-collapse: collapse;">
        <tr><th style="border:1px solid #000; padding:5px;">Description</th><th style="border:1px solid #000; padding:5px;">Amount (₹)</th></tr>
        <tr><td style="border:1px solid #000; padding:5px;">Material (${materialName})</td><td style="border:1px solid #000; padding:5px;">${(materialCost*quantity).toFixed(2)}</td></tr>
        <tr><td style="border:1px solid #000; padding:5px;">Frame (${frameName})</td><td style="border:1px solid #000; padding:5px;">${(frameCost*quantity).toFixed(2)}</td></tr>
        <tr><td style="border:1px solid #000; padding:5px;">Lamination (${laminationName})</td><td style="border:1px solid #000; padding:5px;">${(laminationCost*quantity).toFixed(2)}</td></tr>
        <tr><td style="border:1px solid #000; padding:5px;">Add-ons (${addonsName})</td><td style="border:1px solid #000; padding:5px;">${(addonsValue*quantity).toFixed(2)}</td></tr>
        <tr><td style="border:1px solid #000; padding:5px;">Designing Charges</td><td style="border:1px solid #000; padding:5px;">${(designing*quantity).toFixed(2)}</td></tr>
        <tr><td style="border:1px solid #000; padding:5px;"><strong>Total</strong></td><td style="border:1px solid #000; padding:5px;"><strong>${subtotal.toFixed(2)}</strong></td></tr>
      </table>

      ${remark ? `<p><strong>Remark:</strong> ${remark}</p>` : ''}
      <p style="font-style:italic; margin-top:10px;">Note: Rates valid for 15 days from quotation date.</p>

      <div class="footer" style="margin-top:20px; font-size:14px;">
        <strong>Contact:</strong><br>
        Sumit Mittal, Namit Mittal<br>
        9368885855, 9359995855<br>
        vimalpress@gmail.com<br>
        vimalpress.com
      </div>

      <div class="signature" style="margin-top:40px; text-align:right; font-weight:bold;">
        ___________________________<br>Authorized Signature
      </div>
    </div>
  `;

  document.getElementById("quotation").innerHTML = quoteHTML;
}
