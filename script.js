(() => {
	const modal = document.getElementById('modal');
	const modalContent = document.getElementById('modal-content');
	const modalClose = document.getElementById('modal-close');
	const startBtn = document.getElementById('start-quiz');

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
		}
	];

	function openModal() {
		modal.setAttribute('aria-hidden', 'false');
		renderQuiz();
	}

	function closeModal() {
		modal.setAttribute('aria-hidden', 'true');
		modalContent.innerHTML = '';
	}

	modalClose.addEventListener('click', closeModal);
	modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
	startBtn.addEventListener('click', openModal);

	function renderQuiz() {
		let index = 0;
		const state = {score:0, answers:[]};

		function showQuestion() {
			const item = questions[index];
			modalContent.innerHTML = '';
			const title = document.createElement('h3'); title.id = 'modal-title'; title.textContent = `Pertanyaan ${index+1} dari ${questions.length}`;
			const qEl = document.createElement('p'); qEl.className = 'question'; qEl.textContent = item.q;

			const choices = document.createElement('div'); choices.className = 'choices';
			item.choices.forEach((c,i) => {
				const label = document.createElement('label'); label.className = 'choice';
				const input = document.createElement('input'); input.type = 'radio'; input.name = 'choice'; input.value = i;
				label.appendChild(input);
				label.appendChild(document.createTextNode(c));
				choices.appendChild(label);
			});

			const controls = document.createElement('div'); controls.className = 'quiz-controls';
			const next = document.createElement('button'); next.className = 'btn'; next.textContent = index === questions.length-1 ? 'Selesai' : 'Berikutnya';
			const back = document.createElement('button'); back.className = 'btn ghost'; back.textContent = 'Kembali';
			back.disabled = index === 0;

			next.addEventListener('click', () => {
				const chosen = modalContent.querySelector('input[name="choice"]:checked');
				if (!chosen) { alert('Pilih jawaban dulu.'); return; }
				const val = Number(chosen.value);
				state.answers[index] = val;
				if (val === item.a) state.score++;
				if (index < questions.length-1) { index++; showQuestion(); } else { showResult(); }
			});
			back.addEventListener('click', () => { if (index>0) { index--; showQuestion(); } });

			controls.appendChild(back); controls.appendChild(next);
			modalContent.appendChild(title); modalContent.appendChild(qEl); modalContent.appendChild(choices); modalContent.appendChild(controls);
		}

		function showResult() {
			modalContent.innerHTML = '';
			const h = document.createElement('h3'); h.textContent = 'Hasil Kuiz';
			const p = document.createElement('p'); p.textContent = `Skor Anda: ${state.score} / ${questions.length}`;
			const info = document.createElement('div');
			questions.forEach((q,i) => {
				const el = document.createElement('div');
				el.style.marginBottom = '8px';
				el.innerHTML = `<strong>Q${i+1}:</strong> ${q.q} <br><em>Jawaban benar:</em> ${q.choices[q.a]}<br><small>${q.explain}</small>`;
				info.appendChild(el);
			});
			const closeBtn = document.createElement('button'); closeBtn.className = 'btn'; closeBtn.textContent = 'Tutup';
			closeBtn.addEventListener('click', closeModal);
			modalContent.appendChild(h); modalContent.appendChild(p); modalContent.appendChild(info); modalContent.appendChild(closeBtn);
		}

		showQuestion();
	}

})();
