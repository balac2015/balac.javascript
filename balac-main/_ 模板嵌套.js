 <!--子模板-->
<script type="text/template" id="sub-template">
    <article>
        <h1>id: <%= id %> </h1>
    </article>
</script>
<!--父模板-->
<script type="text/template" id="main-template">
    <% for (var i = 0; i < num; i++) { %>
        <%= subRender({ id: i }); %>
    <% } %>
</script>

var subTemplate = _.template( $('#sub-template').remove().text() ),
    mainTemplate = _.template( $('#main-template').remove().text() );
mainTemplate({
    num: 5,
    subRender: subTemplate
});