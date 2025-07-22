// services/contactService.js
import Contact from "#models/contact";
import User from "#models/user";
import Service from "#services/base";

class ContactService extends Service {
  static Model = Contact;
}

export default ContactService;
