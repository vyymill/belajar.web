document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
    const modalClose = document.getElementById('modal-close');
    const startBtn = document.getElementById('start-quiz');
    const progressBtn = document.getElementById('view-progress');

    if (!modal || !modalContent || !modalClose || !startBtn || !progressBtn) {
        console.warn('Quiz script: required elements not found.');
        return;
    }

    const questions = [
        {
            q: 'Apa salah satu zat berbahaya yang terdapat dalam rokok?',
            choices: ['Air', 'Nikotin', 'Vitamin C'],
            a: 1,
            explain: 'Nikotin adalah zat adiktif utama dalam rokok.'
        },
        {
            q: 'Merokok meningkatkan risiko penyakit apa?',
            choices: ['Diabetes tipe 1 saja', 'Penyakit jantung', 'Rabun jauh'],
            a: 1,
            explain: 'Merokok secara signifikan meningkatkan risiko penyakit jantung.'
        },
        {
            q: 'Berhenti merokok dapat memberikan manfaat dalam berapa lama?',
            choices: ['Dalam 20 menit', 'Tidak pernah', 'Setelah 50 tahun'],
            a: 0,
            explain: 'Beberapa manfaat, seperti penurunan detak jantung, bisa terlihat dalam 20 menit.'
        },
        {
            q: 'Apa yang terjadi pada paru-paru setelah 1 tahun berhenti merokok?',
            choices: ['Risiko kanker paru meningkat', 'Risiko penyakit jantung menurun', 'Fungsi paru memburuk'],
            a: 1,
            explain: 'Risiko penyakit jantung menurun setelah satu tahun berhenti merokok.'
        },
        {
            q: 'Bagaimana asap rokok mempengaruhi perokok pasif?',
            choices: ['Tidak berpengaruh', 'Hanya mengiritasi mata', 'Meningkatkan risiko penyakit jantung dan kanker'],
            a: 2,
            explain: 'Perokok pasif juga berisiko terkena masalah kesehatan serius dari asap rokok.'
        },
        {
            q: 'Apa salah satu cara efektif untuk mengurangi keinginan merokok?',
            choices: ['Minum banyak air', 'Menonton TV', 'Tidur di siang hari'],
            a: 0,
            explain: 'Minum air dapat membantu mengalihkan dorongan dan mengurangi gejala putus nikotin.'
        },
        {
            q: 'Apakah merokok dapat mempengaruhi kehamilan?',
            choices: ['Tidak, tidak ada hubungan', 'Ya, meningkatkan risiko bayi lahir rendah', 'Hanya jika ibu merokok berat'],
            a: 1,
            explain: 'Merokok selama kehamilan meningkatkan risiko bayi lahir dengan berat rendah dan komplikasi.'
        },
        {
            q: 'Mengapa olahraga membantu saat berhenti merokok?',
            choices: ['Membuat tubuh kecanduan rokok', 'Mengurangi stres dan meningkatkan energi', 'Membuat mulut kering'],
            a: 1,
            explain: 'Olahraga membantu mengurangi stres dan meningkatkan perasaan positif ketika berhenti merokok.'
        },
        {
            q: 'Apa gejala umum putus nikotin?',
            choices: ['Nafsu makan menurun dan tidur lebih nyenyak', 'Gelisah, sakit kepala, dan mudah marah', 'Kulit menjadi lebih sehat'],
            a: 1,
            explain: 'Gelisah, sakit kepala, dan mudah marah adalah gejala umum saat tubuh menyesuaikan diri tanpa nikotin.'
        },
        {
            q: 'Mana yang bukan manfaat langsung ketika berhenti merokok?',
            choices: ['Detak jantung menurun', 'Kualitas kulit memburuk', 'Kadar oksigen dalam darah meningkat'],
            a: 1,
            explain: 'Kualitas kulit biasanya membaik, bukan memburuk, setelah berhenti merokok.'
        }
    ];

    const progressData = [
        { name: 'Kamil', duration: '30 hari', status: 'Mulai lebih sehat', percent: 35, note: 'Energi lebih baik dan napas terasa lebih ringan setelah aktivitas sehari-hari.' },
        { name: 'Firza', duration: '7 hari', status: 'Mengurangi gejala putus nikotin', percent: 20, note: 'Sakit kepala berkurang dan selera makan mulai stabil.' },
        { name: 'Esqi', duration: '90 hari', status: 'Sudah terbiasa tanpa rokok', percent: 80, note: 'Kulit lebih cerah, tidur lebih nyenyak, dan kebiasaan sehat mulai terbentuk.' },
        { name: 'Pasha', duration: '14 hari', status: 'Mengendalikan pemicu', percent: 40, note: 'Sudah berkembang strategi untuk menolak tawaran rokok dan stres.' }
    ];

    const state = {
        currentIndex: 0,
        score: 0,
        answers: []
    };

    function openModal(contentRenderer) {
        modal.setAttribute('aria-hidden', 'false');
        contentRenderer();
    }

    function closeModal() {
        modal.setAttribute('aria-hidden', 'true');
        modalContent.innerHTML = '';
    }

    function createButton(text, className, onClick) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = className;
        button.textContent = text;
        button.addEventListener('click', onClick);
        return button;
    }

    function renderQuiz() {
        state.currentIndex = 0;
        state.score = 0;
        state.answers = [];
        showQuestion();
    }

    function showQuestion() {
        const item = questions[state.currentIndex];
        modalContent.innerHTML = '';

        const title = document.createElement('h3');
        title.id = 'modal-title';
        title.textContent = `Pertanyaan ${state.currentIndex + 1} dari ${questions.length}`;

        const qEl = document.createElement('p');
        qEl.className = 'question';
        qEl.textContent = item.q;

        const choices = document.createElement('div');
        choices.className = 'choices';

        item.choices.forEach((choice, i) => {
            const label = document.createElement('label');
            label.className = 'choice';
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'choice';
            input.value = i;
            if (state.answers[state.currentIndex] === i) {
                input.checked = true;
            }
            label.appendChild(input);
            label.appendChild(document.createTextNode(choice));
            choices.appendChild(label);
        });

        const controls = document.createElement('div');
        controls.className = 'quiz-controls';

        const backBtn = createButton('Kembali', 'btn ghost', () => {
            if (state.currentIndex > 0) {
                state.currentIndex -= 1;
                showQuestion();
            }
        });
        backBtn.disabled = state.currentIndex === 0;

        const nextBtn = createButton(state.currentIndex === questions.length - 1 ? 'Selesai' : 'Berikutnya', 'btn', () => {
            const chosen = modalContent.querySelector('input[name="choice"]:checked');
            if (!chosen) {
                alert('Pilih jawaban dulu.');
                return;
            }
            const answer = Number(chosen.value);
            state.answers[state.currentIndex] = answer;
            if (answer === item.a) {
                state.score += 1;
            }
            if (state.currentIndex < questions.length - 1) {
                state.currentIndex += 1;
                showQuestion();
            } else {
                showResult();
            }
        });

        controls.appendChild(backBtn);
        controls.appendChild(nextBtn);

        modalContent.appendChild(title);
        modalContent.appendChild(qEl);
        modalContent.appendChild(choices);
        modalContent.appendChild(controls);
    }

    function showResult() {
        modalContent.innerHTML = '';

        const title = document.createElement('h3');
        title.textContent = 'Hasil Kuiz';

        const scoreText = document.createElement('p');
        scoreText.textContent = `Skor Anda: ${state.score} / ${questions.length}`;

        const info = document.createElement('div');
        questions.forEach((q, i) => {
            const item = document.createElement('div');
            item.style.marginBottom = '8px';
            item.innerHTML = `<strong>Q${i + 1}:</strong> ${q.q} <br><em>Jawaban benar:</em> ${q.choices[q.a]}<br><small>${q.explain}</small>`;
            info.appendChild(item);
        });

        const closeBtn = createButton('Tutup', 'btn', closeModal);

        modalContent.appendChild(title);
        modalContent.appendChild(scoreText);
        modalContent.appendChild(info);
        modalContent.appendChild(closeBtn);
    }

    function renderProgress() {
        modalContent.innerHTML = '';

        const title = document.createElement('h3');
        title.id = 'modal-title';
        title.textContent = 'Survei Berhenti Merokok';

        const summary = document.createElement('p');
        summary.textContent = 'Lihat kisah dan pencapaian peserta yang sedang berjuang berhenti merokok.';

        const list = document.createElement('div');
        list.className = 'progress-list';

        progressData.forEach((item) => {
            const card = document.createElement('div');
            card.className = 'card progress-card';
            card.innerHTML = `
                <h4>${item.name}</h4>
                <p><strong>Durasi:</strong> ${item.duration}</p>
                <p><strong>Status:</strong> ${item.status}</p>
                <p>${item.note}</p>
            `;

            const track = document.createElement('div');
            track.className = 'progress-track';
            const fill = document.createElement('div');
            fill.className = 'progress-fill';
            fill.style.width = `${item.percent}%`;
            fill.textContent = `${item.percent}%`;

            track.appendChild(fill);
            card.appendChild(track);
            list.appendChild(card);
        });

        const closeBtn = createButton('Tutup', 'btn', closeModal);

        modalContent.appendChild(title);
        modalContent.appendChild(summary);
        modalContent.appendChild(list);
        modalContent.appendChild(closeBtn);
    }

    function openProgress() {
        openModal(renderProgress);
    }

    startBtn.addEventListener('click', () => openModal(renderQuiz));
    progressBtn.addEventListener('click', openProgress);
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});
