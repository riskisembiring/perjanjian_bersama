import "./css/InformasiPb.css";

function InformasiPb() {
  return (
    <div className="info-container">
      <h1 className="info-title">Perjanjian Bersama (PB) Pengadilan Negeri Ternate</h1>
      <p className="info-intro">
        Perjanjian Bersama yang telah didaftarkan ke <b>Pengadilan Hubungan Industrial (PHI) </b> 
        adalah kesepakatan tertulis antara pengusaha dan pekerja untuk menyelesaikan perselisihan 
        hubungan industrial. Setelah didaftarkan, dokumen ini menjadi hukum final dan mengikat 
        dengan kekuatan eksekutorial layaknya putusan pengadilan.
      </p>

      <section className="info-section">
        <h2 className="info-subtitle">Apa itu Perjanjian Bersama (PB)?</h2>
        <p>
          PB adalah hasil kesepakatan tertulis dari musyawarah atau perundingan antara pengusaha 
          dan pekerja/serikat pekerja. Isinya biasanya mencakup penyelesaian perselisihan, 
          seperti hak dan kewajiban terkait PHK, yang harus dipatuhi sesuai kesepakatan.
        </p>
      </section>

      <section className="info-section">
        <h2 className="info-subtitle">Mengapa Perlu Didaftarkan ke PHI?</h2>
        <ul className="info-list">
          <li><b>Mengikat dan Final:</b> PB menjadi dokumen hukum yang final dan mengikat semua pihak.</li>
          <li><b>Kekuatan Eksekutorial:</b> PB yang didaftarkan dapat langsung dieksekusi oleh PHI.</li>
          <li><b>Mencegah Tumpang Tindih:</b> Pendaftaran menjadi dasar hukum yang jelas, tanpa perlu gugatan baru.</li>
        </ul>
      </section>

      <section className="info-section">
        <h2 className="info-subtitle">Bagaimana Proses Pendaftaran PB ke PHI?</h2>
        <ol className="info-list">
          <li><b>Penyelesaian Sengketa:</b> Perundingan bipartit antara pengusaha dan pekerja.</li>
          <li><b>Perjanjian Disepakati:</b> PB ditandatangani kedua belah pihak.</li>
          <li><b>Pendaftaran di PHI:</b> Didaftarkan di Pengadilan Hubungan Industrial (PN setempat).</li>
          <li><b>Persyaratan:</b> Surat permohonan, fotokopi PB yang sudah dineresel di kantor pos, surat kuasa, bukti-bukti pendukung.</li>
        </ol>
      </section>

      <section className="info-section">
        <h2 className="info-subtitle">Apa yang Terjadi Jika Ada Pelanggaran?</h2>
        <p>
          Jika salah satu pihak tidak melaksanakan isi PB, pihak yang dirugikan dapat langsung 
          mengajukan <b>permohonan eksekusi</b> ke Ketua PHI tanpa perlu mengajukan gugatan baru.
        </p>
      </section>
    </div>
  );
}

export default InformasiPb;
