<template>
  <div>
    <NavbarComponent />
    <div class="faq-container">
      <h1>Frequently Asked Questions</h1>
      <div class="faq-members">
        <div v-for="faq in faqs" :key="faq.id" class="faq-member">
          <h2>{{ faq.question }}</h2>
          <p>{{ faq.answer }}</p>
        </div>
      </div>
    </div>
    <ToolBar />
  </div>
</template>
<script>
import NavbarComponent from '../components/NavbarComponent.vue'

export default {
  name: 'FAQView',
  data() {
    return {
      faqs: [
            {
            id: 1,
            question: 'What is RealView?',
            answer: 'RealView is a platform for product designers that allows them to visualize their designs in a realistic, immersive virtual reality environment. With RealView, designers can explore their designs in 3D, show their designs to team members, to customers, and make design decisions in real time.'
            },
            {
            id: 2,
            question: 'How to use VR with RealView?',
            answer: 'To use VR with RealView, you need a VR headset and compatible controllers. Once you have your VR equipment, you can import your 3D models into RealView and explore them in a fully immersive VR environment. We recommend using the Meta Quest line of VR headsets, although most other major headsets will also work.'
            },
            {
            id: 3,
            question: 'How to use RealView to send models to customers?',
            answer: 'You can use RealView to showcase your designs to customers in an immersive, engaging way. Just send the design to your customer and they can examine it on their system through our WebApp. Direct sharing of designs in own portfolio is also coming in the next product release! RealView makes it easy to give virtual product demos, share 3D models, and receive feedback customers during the design process.'
            },
            {
            id: 4,
            question: 'Who is RealView for?',
            answer: 'RealView is designed for product designers who want to create and visualize their designs in a realistic, immersive virtual reality environment. Whether you are designing houses, consumer electronics, houses, home appliances, vehicles or industrial equipment, RealView can help you bring your ideas to life.'
            },
            {
            id: 5,
            question: 'What VR headsets is RealView compatible with?',
            answer: 'RealView is compatible with a variety of VR headsets, but our core supported technology are the Meta Quest 2 and Meta Quest Pro. The product is optimised for these devices.'
            },
            {
            id: 6,
            question: 'How do I create an account on RealView?',
            answer: 'To create an account on RealView, simply click on the Login and then Sign In button located at the top of the page and fill out the brief registration form.'
            },
            {
            id: 7,
            question: 'What is the pricing structure for RealView?',
            answer: 'RealView remains an OpenSource project for now. Voluntary donations are welcome!'
            },
            {
            id: 8,
            question: 'What file types are compatible with RealView?',
            answer: 'For now, you can inspect .glb and .obj files in RealView.'
            }
        // Add more FAQs here
        // ADD ICONS
        // 
      ],
    }
  },
  components: {
    NavbarComponent,
  },
}
</script>
<style>
 body {
  height: 100%;
  background-color: #E8EBF1; /* Oxford Blue complement */
}

.faq-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.faq-members {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2rem;
}

.faq-member {
  flex: 1 1 calc(100% / 3);
  margin: 1rem;
  text-align: center;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #003366; /* Oxford Blue */
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #003366;
}

p {
  font-size: 1rem;
  color: #333;
}
</style>
