
(function($) {
    $(document).ready(function() {

        function getPageList () {

            $.ajax({
                url: './pageList.json',
                type: 'GET',
                dataType: 'json',
                cache: false,
                timeout: 1000,
                success: function(response, textStatus, xhr) {
                    console.log(response);
                    populatePageList(response);
                },
                error: function(xhr) {
                    console.log('ajax error');
                    console.log(xhr);
                }
            });
        }

        function populatePageList (data) {

            if (!data) {
                return;
            }

            var $pageList = $('.bb-page-list');
            if (!$pageList || $pageList.length < 1) {
                return;
            }

            var templateView = null;
            var reqTemplate = $.get('./_bb/page-list-file.hbs', function(view) {
                // Create view from template and data
                templateView = view;
            });

            $.when(reqTemplate).done(function() {

                $.each(data, function () {
                    var $this = $(this)[0];
                    var title = $this.data.title;
                    var url = $this.url;
                    var pageType = $this.data.pageType;
                    var $target = null;

                    console.log(url);
                    console.log(title);
                    console.log(pageType);

                    var templateData = {
                        href : url,
                        title : title
                    }

                    $pageList.each(function () {
                        var $thisList = $(this);
                        var dataPageType = $thisList.attr('data-page-type');

                        if (dataPageType === pageType) {
                            $target = $thisList.find('.file-list');
                        }
                    });

                    if (!$target) {
                        return;
                    }

                    var template = Handlebars.compile(templateView),
                        data = template(templateData),
                        html = $target.append(data);
                });
            });
        }

        getPageList();

    });
}(jQuery));