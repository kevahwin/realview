<template>
  <div>
    <NavbarComponent />
    <div class="team-container">
      <h1>Our Team</h1>
      <div class="team-members">
        <div v-for="member in teamMembers" :key="member.id" class="team-member">
          <h2>{{ member.name }}</h2>
          <p>{{ member.description }}</p>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import NavbarComponent from '../components/NavbarComponent.vue'
  export default {
    data() {
      return {
        teamMembers: [
          {
            id: 1,
            name: "Kirill Sakharov",
            description:
              "Kirill holds a BSc in Management from LSE and is currently pursuing an MSc in Computing at Imperial College.",
          },
          {
            id: 2,
            name: "Olivia Chavigny de Lachevrotiere",
            description:
              "Olivia holds a BA in International Business Management from University of Sheffield and is currently pursuing an MSc in Computing at Imperial College.",
          },
          {
            id: 3,
            name: "Nikhil Rikhye",
            description:
              "Nikhil holds a BSc in Politics and Philosophy from LSE and is currently pursuing an MSc in Computing at Imperial College.",
          },
          {
            id: 4,
            name: "Burak Gunduz",
            description:
              "Burak holds a BEng in Aerospace Engineering from Queen's University Belfast and is currently pursuing an MSc in Computing at Imperial College.",
          },
          {
            id: 5,
            name: "Michal Karlubik",
            description:
              "Michal holds a BA in PPE from University of Oxford and is currently pursuing an MSc in Computing at Imperial College.",
          },
          {
            id: 6,
            name: "Kevin Ahwin",
            description:
              "Kevin holds a BEng in Mechanical Engineering from Afe Babalola University and is currently pursuing an MSc in Computing at Imperial College.",
          },
        ],
      };
    },
    components: {
      NavbarComponent
    }
  };
  </script>

  
<style>
 body {
  height: 100%;
  background-color: #E8EBF1; /* Oxford Blue complement */
}

.team-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.team-members {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2rem;
}

.team-member {
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