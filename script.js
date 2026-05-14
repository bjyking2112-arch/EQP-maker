// 초기 날짜 설정
document.getElementById('inputDate').valueAsDate = new Date();

function generateQR() {
    const name = document.getElementById('itemName').value;
    const life = document.getElementById('lifeSpan').value;
    const date = document.getElementById('inputDate').value;
    const memo = document.getElementById('memo').value;

    if (!name) { alert("장비명을 입력해주세요."); return; }

    // 1. 테이블 행 추가
    const tbody = document.getElementById('historyBody');
    const row = tbody.insertRow(0); // 최신 데이터가 위로
    
    // 2. QR 데이터 구성 (JSON 형태 등으로 장비 정보를 텍스트에 담음)
    const qrData = `장비명:${name}|연수:${life}|일자:${date}|메모:${memo}`;
    
    // 3. 셀 생성 및 데이터 삽입
    const qrCell = row.insertCell(0);
    const nameCell = row.insertCell(1);
    const lifeCell = row.insertCell(2);
    const dateCell = row.insertCell(3);
    const memoCell = row.insertCell(4);

    nameCell.innerText = name;
    lifeCell.innerText = life + "년";
    dateCell.innerText = date;
    memoCell.innerText = memo;

    // 4. QR 코드 생성 (섬네일용)
    const qrDiv = document.createElement('div');
    qrDiv.className = 'qr-thumb';
    qrCell.appendChild(qrDiv);

    const qrcode = new QRCode(qrDiv, {
        text: qrData,
        width: 50,
        height: 50
    });

    // 5. 클릭 시 크게 보기 이벤트
    qrDiv.onclick = function() {
        showFullQR(qrData);
    };

    // 입력창 초기화
    document.getElementById('itemName').value = "";
    document.getElementById('memo').value = "";
}

function showFullQR(data) {
    const modal = document.getElementById('qrModal');
    const content = document.getElementById('modalContent');
    content.innerHTML = ""; // 이전 내용 삭제
    
    modal.style.display = 'flex';
    new QRCode(content, {
        text: data,
        width: 250,
        height: 250
    });
}

function closeModal() {
    document.getElementById('qrModal').style.display = 'none';
}