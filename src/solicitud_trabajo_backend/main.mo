import Array "mo:base/Array";

actor PostulanteList {

  type Postulante = {
    id : Nat;
    nombre : Text;
    puesto : Text;
    edad : Nat;
  };

  var postulantes : [Postulante] = [
    {
      id = 1;
      nombre = "Edgar Eduardo Rocha Ovalle";
      puesto = "Gerente de zona";
      edad = 20;
    }
  ];

  public func addPostulante(nombre : Text, puesto : Text, edad : Nat) : async Bool {
    let newId = Array.size(postulantes) + 1;
    let newPostulante = {
      id = newId;
      nombre = nombre;
      puesto = puesto;
      edad = edad;
    };
    postulantes := Array.append<Postulante>(postulantes, [newPostulante]);
    return true;
  };

  public func getAllPostulantes() : async [Postulante] {
    return postulantes;
  };

  public func getPostulanteById(id : Nat) : async ?Postulante {
    return Array.find<Postulante>(postulantes, func(p) { p.id == id });
  };

  public func updatePostulante(id: Nat, nombre : Text, puesto : Text, edad : Nat) : async Bool {
    let postulanteToUpdate = Array.find<Postulante>(postulantes, func(p) { p.id == id });

    switch (postulanteToUpdate) {
      case (null) { return false };
      case (?postulanteToUpdate) {
        let updatedPostulante = {
          id = id;
          nombre = nombre;
          puesto = puesto;
          edad = edad;
        };
        postulantes := Array.map<Postulante, Postulante>(postulantes, func(p) { if (p.id == id) { updatedPostulante } else { p } });
        return true;
      };
    };
  };

  public func deletePostulante(id : Nat) : async Bool {
    let postulante = Array.find<Postulante>(postulantes, func(p) { p.id == id });
    if (postulante != null) {
      postulantes := Array.filter<Postulante>(postulantes, func(p) { p.id != id });
      return true;
    } else {
      return false;
    };
  };
};
