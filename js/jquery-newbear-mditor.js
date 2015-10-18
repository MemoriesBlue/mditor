(function($){
	var tools = [
		{'class': 'fa fa-rotate-left fa-fw', 'title': '撤销'},
		{'class': 'fa fa-rotate-right fa-fw', 'title': '重做'},
		{'class': 'fa fa-picture-o fa-fw', 'title': '添加图片'}
	];
	

	$.fn.mditor = function(settings) {
		this.html('');
		this.append(buildToolPanel(this), buildBody(this));
		return this;
	}

	var buildToolPanel = function($this) {
		var $toolPanel = $('<div></div>');
		$toolPanel.addClass("mditor-tool-panel");
		var $toolList = $('<div></div');
		var toolTemplate = '<div><span class="${toolClass}" title="${title}"></span></div>';
		$toolList.addClass("mditor-tool-list");
		for(var i in tools) {
			var toolObj = tools[i];
			$toolList.append(toolTemplate.replace('${toolClass}', toolObj['class']).replace('${title}', toolObj['title']));
		}
		$toolPanel.append($toolList);
		$this.$toolList = $toolList;
		$this.$toolPanel = $toolPanel;
		return $toolPanel;
	}
	var buildBody = function($this) {
		var $editor = $('<textArea></textArea>');
		$editor.addClass('mditor-body-editor');
		$editor.bind('input', function(){
			refresh($this);
		});

		var $previewer = $('<div></div>');
		$previewer.addClass('mditor-body-previewer');

		var $content = $('<div></div>');
		$content.addClass('mditor-body-previewer-content');

		$previewer.append($content);

		var $body = $('<div></div>');
		$body.addClass('mditor-body');
		$body.append($editor, $previewer);

		$this.$body = $body;
		$this.$editor = $editor;
		$this.$previewer = $previewer;
		$this.$content = $content;
		return $body;
	}
	var refresh = function($this) {
		$this.$content.html(marked($this.$editor.val()));
	}
})(jQuery);