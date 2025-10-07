const materialRates = {
  "White Back": 5,
  "Black Back": 10,
  "White backside": 15,
  "Star": 20,
  "star backside": 25,
  "Back Light": 30,
  "vnyle": 35,
  "oneway": 40,
  "radium": 45,
  "sunboard": 50,
  "radium sunboard": 55
};
const frameRates = { "1kg": 10, "2kg": 20, "3kg": 30 };
const laminationRates = { "gloss": 10, "matte": 12 };
const addonRates = { "Illet": 0 };

document.getElementById("calcBtn").addEventListener("click", calculate);
document.getElementById("downloadPdfBtn").addEventListener("click", downloadPDF);

function calculate() {
  const customer = document.getElementById("customerName").value || "Customer";
  const date = document.getElementById("date").value || new Date().toLocaleDateString();
  const w = parseFloat(document.getElementById("width").value) || 0;
  const h = parseFloat(document.getElementById("height").value) || 0;
  const qty = parseInt(document.getElementById("quantity").value) || 1;
  const material = document.getElementById("materialType").value;
  const frame = document.getElementById("frameType").value;
  const illet = document.getElementById("illet").checked;
  const designing = parseFloat(document.getElementById("designingCharges").value) || 0;
  const gstChecked = document.getElementById("gstCheck").checked;

  const lam = document.querySelector('input[name="lam"]:checked').value;

  const area = w * h;
  const matRate = materialRates[material];
  const matCost = area * qty * matRate;
  const frameCost = frame ? (frameRates[frame] * qty) : 0;
  const lamCost = lam !== "none" ? laminationRates[lam] * area * qty : 0;
  const illetCost = illet ? addonRates["Illet"] * qty : 0;

  let subtotal = matCost + frameCost + lamCost + illetCost + designing;
  let gstAmount = gstChecked ? subtotal * 0.18 : 0;
  let total = subtotal + gstAmount;

  const html = `
    <div style="display:flex;justify-content:space-between;align-items:flex-start">
      <div>
        <h3>Vimal Press</h3>
        <p>Flex Printing Quotation</p>
        <p><strong>Customer:</strong> ${customer}<br>
        <strong>Date:</strong> ${date}</p>
      </div>
      <div>
        <img src="logo.png" alt="Logo" />
      </div>
    </div>

    <table>
      <tr><th>Item</th><th>Details</th><th>Amount (₹)</th></tr>
      <tr><td>Material</td><td>${material} (${area} sq.ft × ${qty})</td><td>${matCost.toFixed(2)}</td></tr>
      ${frame ? `<tr><td>Frame (${frame})</td><td>${qty} pcs</td><td>${frameCost.toFixed(2)}</td></tr>` : ""}
      ${lam !== "none" ? `<tr><td>Lamination (${lam})</td><td>${area * qty} sq.ft</td><td>${lamCost.toFixed(2)}</td></tr>` : ""}
      ${illet ? `<tr><td>Illets</td><td>Complementary</td><td>${illetCost.toFixed(2)}</td></tr>` : ""}
      <tr><td>Designing Charges</td><td>-</td><td>${designing.toFixed(2)}</td></tr>
      ${gstChecked ? `<tr><td>GST 18%</td><td>-</td><td>${gstAmount.toFixed(2)}</td></tr>` : ""}
      <tr><th colspan="2">Grand Total</th><th>₹${total.toFixed(2)}</th></tr>
    </table>

    <p style="margin-top:10px;font-style:italic;font-size:0.9em;">
      Rates valid for 15 days from the date of quotation.
    </p>
  `;

  document.getElementById("quotationResult").innerHTML = html;
  document.getElementById("downloadPdfBtn").disabled = false;
}

async function downloadPDF() {
  const customer = document.getElementById("customerName").value || "Customer";
  const fileName = `quotation-${customer.replace(/\s+/g, '-')}.pdf`;

  const element = document.getElementById("quotationResult");
  const canvas = await html2canvas(element, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("p", "pt", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const imgWidth = pageWidth - 40;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  pdf.addImage(imgData, "PNG", 20, 20, imgWidth, imgHeight);
  pdf.save(fileName);
}
