const form = document.getElementById("signupForm");
const submitButton = document.getElementById("submitButton");
const formMessage = document.getElementById("formMessage");

const scriptURL = "https://script.google.com/macros/s/AKfycbwTUP3v5kvqA6lg9Q3_UUodDjTz9wJa8R9epKv7mFwGLOTz2DAdt6fQu8uOlr_kPlrG7g/exec";


form.addEventListener("submit", async function (event) {

    event.preventDefault();

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    formMessage.textContent = "";
    formMessage.className = "form-message";


    const supportOptions = document.querySelectorAll(
        'input[name="support"]:checked'
    );

    const support = [];

    supportOptions.forEach(function (option) {
        support.push(option.value);
    });


    const data = {

        parentName: document.getElementById("parentName").value,

        email: document.getElementById("email").value,

        phone: document.getElementById("phone").value,

        studentName: document.getElementById("studentName").value,

        gradeLevel: document.getElementById("gradeLevel").value,

        learner: document.getElementById("learner").value,

        support: support.join(", "),

        anythingElse: document.getElementById("anythingElse").value

    };


    try {

        await fetch(scriptURL, {

            method: "POST",

            mode: "no-cors",

            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },

            body: JSON.stringify(data)

        });


        // Show success message
        form.innerHTML =
            '<div class="signup-success">' +
                '<span class="eyebrow">03 / THANK YOU</span>' +
                '<h2>We\'ve got <em>your inquiry.</em></h2>' +
                '<p>Thanks for telling us a little about your learner. We\'ll review your information and be in touch about next steps.</p>' +
                '<a href="index.html" class="button button-dark">Back to Curious Minds →</a>' +
            '</div>';


    } catch (error) {

        console.error("Form submission error:", error);

        submitButton.disabled = false;

        submitButton.textContent = "Send Inquiry →";

        formMessage.textContent =
            "Something went wrong. Please try again.";

        formMessage.className =
            "form-message form-error";

    }

});