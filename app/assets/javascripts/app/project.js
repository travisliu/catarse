App.addChild('Project', {
  el: '#main_content[data-action="show"][data-controller-name="projects"]',

  events: {
    'click nav#project_menu a' : 'onTabClick',
    'click #toggle_warning a' : 'toggleWarning'
  },

  activate: function(){
    this.$warning = this.$('#project_warning_text');
  },

  toggleWarning: function(){
    this.$warning.slideToggle('slow');
    return false;
  },

  selectTab: function($el){
    this.trigger('onSelectTab');
    this.$('nav#project_menu a').removeClass('selected');
    $el.addClass('selected');
  },

  toggleTab: function($tab){
    this.$('#project_content .content').hide();
    $tab.show();
  },

  onTabClick: function(event){
    var $target = $(event.target);
    var $tab = this.$($target.data('target'));
    this.loadTab($tab);
    this.selectTab($target);
    this.toggleTab($tab);
    return false;
  },

  loadTab: function($tab){
    var that = this;
    if($.trim($tab.html()) == '' && $tab.data('path')){
      $.get($tab.data('path')).success(function(data){
        $tab.html(data);
      });
    }
  },
});

