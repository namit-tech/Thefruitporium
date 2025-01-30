import React from 'react';
import "./contact.css";

const Contact = () => {
    return (
        <>
            <div>
                {/* <a href="/"></a> */}
                <section class="form" id="contact">
                    <h1>Contact Us For Latest Updates</h1>
                    <div>
                        <form action="">
                            <input type="text" id="name" placeholder=" YourName" required />
                            <input type="email" id="email" placeholder=" YourEmail" required />
                            <input type="number" id="number" placeholder=" YourContactNo." />
                            <textarea name="message" id="message" cols="25" placeholder="Message" rows="5" required></textarea>
                            <button class="formButton btn-outline-success" type="submit">Send</button>
                        </form>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Contact;