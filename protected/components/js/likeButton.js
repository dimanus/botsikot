;
(function($, window, document, undefined) {

    // Create the defaults once
    var pluginName = "likeButton",
            defaults = {
        onSuccess: function() {
        },
        url: ''
    };

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype.init = function() {
        var options = this.options;
        $(this.element).on('click', function(event) {
            $.ajax({
                url: options.url,
                data: {
                    id: $(event.currentTarget).attr('data-id')
                },
                success: function() {
                    if (typeof options.onSuccess === 'function') {
                        options.onSuccess(event.currentTarget);
                    }
                    $(event.currentTarget).removeClass('btn-primary');
                    $(event.currentTarget).addClass('btn-inverse');
                    var likes = $('[data-id=\'' + $(event.currentTarget).attr('data-id') + '\'] .likes').html();
                    $('[data-id=\'' + $(event.currentTarget).attr('data-id') + '\'] .likes').html(parseInt(likes, 10) + 1);
                }
            });
            return false;
        });
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if ( !$.data(this, "plugin_" + pluginName )) {
                $.data( this, "plugin_" + pluginName,
                new Plugin( this, options ));
            }
        });
    }

})(jQuery, window, document);
