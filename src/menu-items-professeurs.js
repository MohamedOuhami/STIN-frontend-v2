const menuItems = {
  items: [
    // Students and Teacher manager
  
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
    }
  ]
};

export default menuItems;
