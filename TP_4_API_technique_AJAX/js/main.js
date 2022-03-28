//AJAX

//est une technique (pas un langage) qui permet de mettre à jour une partie d'un document sans le quitter ou le recharger
//Il est important de noter que l’utilisation d’ajax connait plusieurs methodes (XMLHttpRequest, avec jQuery, la bib axios …)

//Type : type de la requete (verbe HTTP)
//url : cible de la requete
//data : donnés à envoyer
//dataType : type de données qu’on reçoit  du serveur
//timeout : temps d’exécution
//contentType : type de données qu’on envoie au serveur
//processData : gestion de la serialisation (Lorsque data est un objet, jQuery génère la chaîne de données à partir des paires clé/valeur
//de l'objet, sauf si l'option processData est définie sur false. Par exemple, { a: 'bc', d: 'e,f' } est converti en la chaîne 'a=bc&d=e%2Cf'.)
//cette option est pratiquement non utilisée, on garde le comportement par defaut.
//Ex : les todos via l’api de placeholder

let request = $.ajax({
  type: "GET",
  url: "https://jsonplaceholder.typicode.com/users",
  //data: Datas,
  dataType: "json",
  //timeout: 120000, //2 Minutes
  //cache: false,
  //contentType: false,
  //processData: false,
  //beforeSend: function () {
  //    //Code à jouer avant l'appel ajax en lui même
  //},
});

request.done(function (response) {
  //Code à jouer en cas d'éxécution sans erreur du script du PHP
  let html = "";
  response.map((todo) => {
    html += `
                <div class="card card-todo">
                    <div class="card-body">
                        <h5 class="card-title">
                          <button type="button" class="btn btn-primary">
                            Id:<span class="badge badge-light">${todo.id}</span> ${todo.name}
                            </button></h5>
                          <p class="card-text">
                            Prénom:${todo.username}<br />                    
                            Adresse:${todo.address.street}<br />
                                    ${todo.address.suite}<br />
                                    ${todo.address.city}<br />
                                    ${todo.address.zipcode}<br />
                          </p>
                         <a href="https://www.google.fr/maps/place/${todo.address.geo.lng},${todo.address.geo.lat}" class="btn btn-primary"> Lien Google Map </a> <br /><br />
                         <p>E-mail:${todo.email}</p>
                         <a href="#" class="btn btn-primary"> ${todo.phone} </a>
                         <a href="https://${todo.website}" class="btn btn-primary"> Site Web </a>
                          
                    </div>
                </div>`;
  });
  $(".todos").html(html);
});

request.fail(function (http_error) {
  //Code à jouer en cas d'éxécution en erreur du script du PHP
  let server_msg = http_error.responseText;
  let code = http_error.status;
  let code_label = http_error.statusText;
  alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
});
