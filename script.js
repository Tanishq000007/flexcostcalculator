document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("calcBtn").addEventListener("click", calculate);
  document.getElementById("downloadPdfBtn").addEventListener("click", downloadPDF);
});

function calculate() {
  const name = document.getElementById("customerName").value;
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
  const addonsValue = 0; // Always zero

  const designing = parseFloat(document.getElementById("designing").value || 0);
  const remark = document.getElementById("remark").value;
  const gstChecked = document.getElementById("gst").checked;

  if (!width || !height) {
    alert("Please enter valid width and height");
    return;
  }

  const areaSqInch = width * height;

  const materialCost = areaSqInch * materialValue;
  const frameCost = areaSqInch * frameValue;
  const laminationCost = areaSqInch * laminationValue;

  let singleTotal = materialCost + frameCost + laminationCost + addonsValue + designing;
  let subtotal = singleTotal * quantity;
  const gst = gstChecked ? subtotal * 0.18 : 0;
  const total = subtotal + gst;

  const today = new Date().toLocaleDateString();

  document.getElementById("quotation").innerHTML = `
    <div id="pdfContent" style="width:100%; padding:0; margin:0; overflow: visible;">
      <div style="display:flex; justify-content: space-between; align-items:center;">
        <h2>Quotation</h2>
        <img src="logo.png" alt="Logo" style="width:100px; height:auto;" />
      </div>

      <p><strong>Customer:</strong> ${name}</p>
      <p><strong>Date:</strong> ${today}</p>
      <p><strong>Size:</strong> ${width}" × ${height}" (${areaSqInch.toFixed(0)} sq.in)</p>
      <p><strong>Quantity:</strong> ${quantity}</p>

      <table>
        <tr><th>Description</th><th>Amount (₹)</th></tr>
        <tr><td>Material (${materialName})</td><td>${(materialCost*quantity).toFixed(2)}</td></tr>
        <tr><td>Frame (${frameName})</td><td>${(frameCost*quantity).toFixed(2)}</td></tr>
        <tr><td>Lamination (${laminationName})</td><td>${(laminationCost*quantity).toFixed(2)}</td></tr>
        <tr><td>Add-ons (${addonsName})</td><td>${(addonsValue*quantity).toFixed(2)}</td></tr>
        <tr><td>Designing Charges</td><td>${(designing*quantity).toFixed(2)}</td></tr>
        <tr><td><strong>Subtotal</strong></td><td><strong>${subtotal.toFixed(2)}</strong></td></tr>
        ${gstChecked ? `<tr><td>GST (18%)</td><td>${gst.toFixed(2)}</td></tr>` : ""}
        <tr><td><strong>Total</strong></td><td><strong>₹${total.toFixed(2)}</strong></td></tr>
      </table>

      ${remark ? `<p><strong>Remark:</strong> ${remark}</p>` : ""}

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
    </div>
  `;
}

function downloadPDF() {
  const name = document.getElementById("customerName").value || "Customer";
  const element = document.getElementById("pdfContent");

  if (!element || !element.innerHTML.trim()) {
    alert("Please calculate the quotation first!");
    return;
  }

  setTimeout(() => {
    const opt = {
      margin: 10,
      filename: `quotation-${name}.pdf`,
      image: { type: 'png', quality: 1 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: true,
        windowWidth: element.scrollWidth
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  }, 500);
}
