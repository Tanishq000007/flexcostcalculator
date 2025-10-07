// Fixed & Variable Rates
const materials = {
  "Standard Flex": 50,
  "Premium Flex": 70,
  "Vinyl Flex": 90
};

const addons = {
  "Grommets": 50,
  "Frames": 100,
  "Special Finish": 150
};

const laminationRate = 10;

function calculateQuotation() {
  const name = document.getElementById("customerName").value || "Valued Customer";
  const date = document.getElementById("date").value;
  const width = parseFloat(document.getElementById("width").value) || 0;
  const height = parseFloat(document.getElementById("height").value) || 0;
  const quantity = parseInt(document.getElementById("quantity").value) || 1;
  const materialType = document.getElementById("materialType").value;
  const designingCharges = parseFloat(document.getElementById("designingCharges").value) || 0;
  const laminationChecked = document.getElementById("lamination").checked;
  const selectedAddons = Array.from(document.querySelectorAll(".checkbox-group input:checked")).map(el => el.value);

  const area = width * height;
  const materialCost = area * quantity * materials[materialType];
  const addonsCost = selectedAddons.reduce((sum, item) => sum + addons[item] * quantity, 0);
  const laminationCost = laminationChecked ? area * quantity * laminationRate : 0;
  const totalVariable = materialCost + addonsCost + laminationCost;
  const total = totalVariable + designingCharges;

  let resultHTML = `
    <h2>Quotation</h2>
    <p><strong>Customer:</strong> ${name}</p>
    <p><strong>Date:</strong> ${date}</p>
    <table>
      <tr><th>Item</th><th>Details</th><th>Quantity</th><th>Rate</th><th>Amount (₹)</th></tr>
      <tr><td>Flex Print</td><td>${width}ft × ${height}ft (${area} sq.ft)<br>${materialType}</td><td>${quantity}</td><td>${materials[materialType]}/sq.ft</td><td>${materialCost.toFixed(2)}</td></tr>
  `;

  selectedAddons.forEach(addon => {
    resultHTML += `<tr><td>${addon}</td><td>-</td><td>${quantity}</td><td>${addons[addon]}</td><td>${(addons[addon]*quantity).toFixed(2)}</td></tr>`;
  });

  if (laminationChecked) {
    resultHTML += `<tr><td>Lamination</td><td>${area} sq.ft</td><td>${quantity}</td><td>${laminationRate}/sq.ft</td><td>${laminationCost.toFixed(2)}</td></tr>`;
  }

  resultHTML += `
      <tr><td>Designing Charges</td><td>-</td><td>-</td><td>-</td><td>${designingCharges.toFixed(2)}</td></tr>
      <tr><th colspan="4">Grand Total</th><th>₹${total.toFixed(2)}</th></tr>
    </table>
  `;

  document.getElementById("quotationResult").innerHTML = resultHTML;
}
