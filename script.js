let prediksiList = [];

function hitungRataRata(skore) {
  const arr = skore.split(',').map(s => parseInt(s.trim()));
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function prediksiHasil(skorA, skorB) {
  if (skorA > skorB) return "Menang Tim A";
  if (skorA < skorB) return "Menang Tim B";
  return "Draw (Seri)";
}

function prediksiOverUnder(totalGol, pasaran) {
  return totalGol > pasaran ? "Over" : "Under";
}

function prediksiGanjilGenap(totalGol) {
  return totalGol % 2 === 0 ? "Genap" : "Ganjil";
}

function prediksiSemua() {
  const timA = document.getElementById("timA").value.trim();
  const timB = document.getElementById("timB").value.trim();
  const lagaA = document.getElementById("lagaA").value.trim();
  const lagaB = document.getElementById("lagaB").value.trim();
  const kebobolanA = document.getElementById("kebobolanA").value.trim();
  const kebobolanB = document.getElementById("kebobolanB").value.trim();
  const pasaran = parseFloat(document.getElementById("pasaran").value);

  if (!timA || !timB || !lagaA || !lagaB || !kebobolanA || !kebobolanB || isNaN(pasaran)) {
    alert("Isi semua data dengan benar!");
    return;
  }

  const rataGolA = hitungRataRata(lagaA);
  const rataGolB = hitungRataRata(lagaB);
  const rataBobolA = hitungRataRata(kebobolanA);
  const rataBobolB = hitungRataRata(kebobolanB);

  const skorA = Math.round((rataGolA + rataBobolB) / 2);
  const skorB = Math.round((rataGolB + rataBobolA) / 2);
  const totalGol = skorA + skorB;

  const hasil = prediksiHasil(skorA, skorB);
  const overUnder = prediksiOverUnder(totalGol, pasaran);
  const ganjilGenap = prediksiGanjilGenap(totalGol);

  const prediksi = {
    timA, timB, skorA, skorB, totalGol, hasil, overUnder, ganjilGenap,
    rataA: rataGolA.toFixed(2), rataB: rataGolB.toFixed(2),
    bobolA: rataBobolA.toFixed(2), bobolB: rataBobolB.toFixed(2),
    pasaran
  };

  prediksiList.push(prediksi);
  tampilkanHasil();
  document.getElementById("prediksiForm").reset();
}

function tampilkanHasil() {
  const hasilContainer = document.getElementById("hasil-list");
  hasilContainer.innerHTML = "";

  prediksiList.forEach((p, index) => {
    hasilContainer.innerHTML += `
      <div class="prediksi-item">
        <b>${p.timA} vs ${p.timB}</b><br>
        Skor Prediksi: ${p.skorA} - ${p.skorB} <br>
        Total Gol: ${p.totalGol} (${p.ganjilGenap}) <br>
        Over/Under ${p.pasaran}: <b>${p.overUnder}</b><br>
        Hasil Akhir: <b>${p.hasil}</b><br>
        Rata-rata:<br>
        ${p.timA} (Gol: ${p.rataA}, Kebobolan: ${p.bobolA})<br>
        ${p.timB} (Gol: ${p.rataB}, Kebobolan: ${p.bobolB})
      </div>
    `;
  });
}

function resetSemua() {
  prediksiList = [];
  document.getElementById("hasil-list").innerHTML = "";
  document.getElementById("prediksiForm").reset();
}

function downloadJPG() {
  html2canvas(document.getElementById("hasil-list")).then(canvas => {
    const link = document.createElement("a");
    link.download = "hasil-prediksi.jpg";
    link.href = canvas.toDataURL("image/jpeg");
    link.click();
  });
}
