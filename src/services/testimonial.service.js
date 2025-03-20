import Testimonial from "#models/testimonial";
import Service from "#services/base";

class TestimonialService extends Service {
  static Model = Testimonial;
}

export default TestimonialService;
