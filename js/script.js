document.addEventListener('DOMContentLoaded', function() {
    
    const form = document.getElementById('questionsForm');
    const thankYouMessage = document.getElementById('thankYouMessage');
    const steps = document.querySelectorAll('.step');
    const nextBtns = document.querySelectorAll('.next-btn');
    const prevBtns = document.querySelectorAll('.prev-btn');
    
    let currentStep = 0;

    // دالة لتحديث الخطوة المعروضة
    function updateSteps() {
        steps.forEach((step, index) => {
            if (index === currentStep) {
                step.classList.add('active-step');
            } else {
                step.classList.remove('active-step');
            }
        });
    }

    // برمجة أزرار "التالي"
    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // التحقق من أن الحقول المطلوبة في الخطوة الحالية ممتلئة قبل الانتقال
            const currentInputs = steps[currentStep].querySelectorAll('input[required]');
            let isValid = true;
            
            currentInputs.forEach(input => {
                if (!input.checkValidity()) {
                    input.reportValidity(); 
                    isValid = false;
                }
            });

            // إذا كان كل شيء سليم، ننتقل للخطوة التالية
            if (isValid) {
                currentStep++;
                updateSteps();
            }
        });
    });

    // برمجة أزرار "السابق"
    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentStep--;
            updateSteps();
        });
    });

    // معالجة الإرسال النهائي
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // إخفاء النموذج بالكامل
        form.style.display = 'none';
        
        // تغيير عنوان النافذة من الأعلى ليتناسب مع الرسالة
        const mainTitle = document.querySelector('.form-title');
        if(mainTitle) mainTitle.style.display = 'none';

        // إظهار رسالة الشكر (الرسالة الختامية)
        thankYouMessage.style.display = 'block';
    });
});