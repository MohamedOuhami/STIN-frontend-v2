const menuItems = {
  items: [
    // Students and Teacher manager
    {
      id: 'gestion-personelle',
      title: 'Gestion des etudiants et professeurs',
      type: 'group',
      icon: 'icon-group',
      children: [
        {
          id: 'etudiant-prepa',
          title: 'Etudiants Classe Preparatoire',
          type: 'item',
          icon: 'feather icon-file-text',
          url: '/prepaStudents'
        },
        {
          id: 'etudiant-ing',
          title: 'Etudiants Cycle Ingenieur',
          type: 'item',
          icon: 'feather icon-file-text',
          url: '/ingStudents'
        },
        {
          id: 'professor',
          title: 'Professeur',
          type: 'item',
          icon: 'feather icon-file-text',
          url: '/professors'
        }
      ]
    },

    {
      id: 'ressources',
      title: 'Ressources',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'salles',
          title: 'Salles',
          type: 'item',
          icon: 'feather icon-home',
          url: '/salles'
        }
      ]
    },

    {
      id: 'emplois-du-temps',
      title: 'Emplois du temps ',
      type: 'group',
      children: [
        {
          id: 'gee',
          title: 'GEE',
          type: 'item',
          icon: 'feather icon-home',
          url: '/emplois/g2e'
        },
        {
          id: 'gc',
          title: 'GC',
          type: 'item',
          icon: 'feather icon-home',
          url: '/emplois/gc'
        },
        {
          id: 'gi',
          title: 'GI',
          type: 'item',
          icon: 'feather icon-home',
          url: '/emplois/gi'
        },
        {
          id: '1ap',
          title: '1AP',
          type: 'item',
          icon: 'feather icon-home',
          url: '/emplois/1ap'
        },
        {
          id: '2ap',
          title: '2AP',
          type: 'item',
          icon: 'feather icon-home',
          url: '/emplois/2ap'
        }
      ]
    },

    {
      id: 'academique',
      title: 'Gestion academique ',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'Modules',
          title: 'Modules',
          type: 'item',
          icon: 'feather icon-home',
          url: '/modules'
        },
        {
          id: 'Elements',
          title: 'Elements',
          type: 'item',
          icon: 'feather icon-home',
          url: '/elements'
        }
      ]
    }
  ]
};

export default menuItems;
