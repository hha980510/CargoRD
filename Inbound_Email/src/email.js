import './style.css';

document.addEventListener("DOMContentLoaded", () => {
  const statusDiv = document.getElementById("status");
  const viewBtn = document.getElementById("view-pdf-btn");
  const base64Pdf = sessionStorage.getItem("latestPdf");

  if (base64Pdf && statusDiv && viewBtn) {
    statusDiv.textContent = "📎 첨부 완료: report.pdf";
    statusDiv.style.color = "green";
    viewBtn.style.display = "inline-block";

    viewBtn.addEventListener("click", () => {
      const byteCharacters = atob(base64Pdf.replace(/-/g, '+').replace(/_/g, '/'));
      const byteNumbers = Array.from(byteCharacters).map(char => char.charCodeAt(0));
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(blob);
      window.open(pdfUrl, '_blank');
    });
  }

});



// Gmail API를 통해 PDF 첨부 이메일 전송
async function sendEmailWithAttachment({ to, subject, body, base64Pdf }) {
  const boundary = "boundary42";

  const rawEmail = [
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    "MIME-Version: 1.0",
    `To: ${to}`,
    `Subject: ${subject}`,
    "",
    `--${boundary}`,
    "Content-Type: text/plain; charset=\"UTF-8\"",
    "Content-Transfer-Encoding: 7bit",
    "",
    body,
    "",
    `--${boundary}`,
    'Content-Type: application/pdf; name="report.pdf"',
    "Content-Transfer-Encoding: base64",
    'Content-Disposition: attachment; filename="report.pdf"',
    "",
    base64Pdf,
    `--${boundary}--`
  ].join("\r\n");

  const encodedMessage = btoa(rawEmail)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;

  const response = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ raw: encodedMessage })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`이메일 전송 실패: ${errorText}`);
  }
}

// 페이지 로드 시 이벤트 바인딩
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("email-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const to = document.getElementById("to").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const body = document.getElementById("body").value.trim();
    const base64Pdf = sessionStorage.getItem("latestPdf");

    if (!base64Pdf) {
      alert("PDF 데이터가 없습니다. 메인 페이지에서 보고서를 먼저 생성해 주세요.");
      return;
    }

    try {
      await sendEmailWithAttachment({ to, subject, body, base64Pdf });
      alert("✅ 이메일이 성공적으로 전송되었습니다.");
    } catch (err) {
      console.error(err);
      alert(`❌ 전송 실패: ${err.message}`);
    }
  });
});
