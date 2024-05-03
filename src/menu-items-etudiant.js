const menuItems = {
  items: [
    // Students and Teacher manager
  
    {
      id: 'emplois-du-temps',
      title: 'Emplois du temps ',
      type: 'group',
      children: [
        {
          id: 'emploi',
          title: 'Consulter emplois du temps',
          type: 'item',
          icon: 'feather icon-home',
          url: '/emplois/voirEmploi'
        }
      ]
    }
  ]
};

export default menuItems;
