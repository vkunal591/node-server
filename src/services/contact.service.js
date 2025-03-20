import Contact from "#models/contact";
import Service from "#services/base";

class ContactService extends Service {
  static Model = Contact;
}

export default ContactService;
