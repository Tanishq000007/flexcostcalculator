document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("calcBtn").addEventListener("click", calculate);
  document.getElementById("downloadPdfBtn").addEventListener("click", downloadPDF);
});

function calculate() {
  const name = document.getElementById("customerName").value;
  const width = parseFloat(document.getElementById("width").value);
  const height = parseFloat(document.getElementById("height").value);
  const materialDropdown = document.getElementById("material");
  const materialValue = parseFloat(materialDropdown.value);
  const materialName = materialDropdown.options[materialDropdown.selectedIndex].text;
  const frame = parseFloat(document.getElementById("frame").value);
  const addons = parseFloat(document.getElementById("addons").value);
  const designing = parseFloat(document.getElementById("designing").value || 0);
  const gstChecked = document.getElementById("gst").checked;

  const gloss = document.getElementById("gloss").checked ? 10 : 0;
  const matte = document.getElementById("matte").checked ? 12 : 0;

  if (!width || !height) {
    alert("Please enter valid width and height");
    return;
  }

  const areaSqInch = width * height;

  const materialCost = areaSqInch * materialValue;
  const frameCost = areaSqInch * frame;
  const laminationCostPerInch = gloss || matte;
  const laminationCost = areaSqInch * laminationCostPerInch;
  const addonsCost = addons;

  const subtotal = materialCost + frameCost + laminationCost + addonsCost + designing;
  const gst = gstChecked ? subtotal * 0.18 : 0;
  const total = subtotal + gst;

  const today = new Date().toLocaleDateString();

  document.getElementById("quotation").innerHTML = `
    <img src="logo.png" class="logo" alt="Logo" />
    <h2>Quotation</h2>
    <p><strong>Customer:</strong> ${name}</p>
    <p><strong>Date:</strong> ${today}</p>
    <p><strong>Size:</strong> ${width}" × ${height}" (${areaSqInch.toFixed(0)} sq.in)</p>
    <table>
      <tr><th>Description</th><th>Amount (₹)</th></tr>
      <tr><td>Material (${materialName})</td><td>${materialCost.toFixed(2)}</td></tr>
      <tr><td>Frame</td><td>${frameCost.toFixed(2)}</td></tr>
      <tr><td>Lamination</td><td>${laminationCost.toFixed(2)}</td></tr>
      <tr><td>Add-ons</td><td>${addonsCost.toFixed(2)}</td></tr>
      <tr><td>Designing Charges</td><td>${designing.toFixed(2)}</td></tr>
      <tr><td><strong>Subtotal</strong></td><td><strong>${subtotal.toFixed(2)}</strong></td></tr>
      ${gstChecked ? `<tr><td>GST (18%)</td><td>${gst.toFixed(2)}</td></tr>` : ""}
      <tr><td><strong>Total</strong></td><td><strong>₹${total.toFixed(2)}</strong></td></tr>
    </table>

    <p class="note">Note: Rates valid for 15 days from quotation date.</p>

    <div class="footer">
      <strong>Contact:</strong><br>
      Sumit Mittal, Namit Mittal<br>
      9368885855, 9359995855<br>
      vimalpress@gmail.com<br>
      vimalpress.com<br>
      <br>Thank you for choosing us!
    </div>

    <div class="signature">
      ___________________________<br>
      Authorized Signature
    </div>
  `;
}

function downloadPDF() {
  const name = document.getElementById("customerName").value || "Customer";
  const element = document.getElementById("quotation");
  const opt = {
    margin: 10,
    filename: `quotation-${name}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };
  html2pdf().set(opt).from(element).save();
}
