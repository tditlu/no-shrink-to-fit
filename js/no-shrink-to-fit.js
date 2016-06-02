(function(window) {
	if (!window) { return; }
	if (!window.navigator) { return; }
	if (!window.navigator.userAgent) { return; }
	if (!window.document) { return; }
	var userAgent = window.navigator.userAgent;
	var document = window.document;
	var addShrinkToFitToMeta = function() {
		var metas = document.querySelectorAll('meta[name="viewport"]');
		if (metas && metas.length) {
			for (var i = 0; i < metas.length; i++) {
				var contentString = 'content';
				var shrinkToFitString = 'shrink-to-fit';
				var content = metas[i].getAttribute(contentString);
				if (content && content.indexOf(shrinkToFitString) === -1) {
					content += ', ' + shrinkToFitString;
					metas[i].setAttribute(contentString, content);
				}
			}
		}
	};
	var matches = userAgent.match(/iP(ad|od|hone).*AppleWebKit.*Version\/(\d+)\./);
	if (matches && matches.length === 3) {
		var version = parseInt(matches[2], 10);
		if (version >= 9) {
			if (/complete|interactive|loaded/.test(document.readyState)) {
				addShrinkToFitToMeta();
			} else {
				document.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
					document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);
					addShrinkToFitToMeta();
				});
			}
		}
	}
}(window));
