import React, { Component } from "react";


import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View, 
  FlatList, 
  ActivityIndicator, 
  TouchableWithoutFeedback,
} from "react-native";


class App extends Component {

  state = {
    data: [],
    pag: 1,
    loading: false,
    refreshing: false,
    modalVisible: false,
    id: '',
    name: '',
    apelido: '',
    nascimento: '',
    codigo: '',
    sexo: '',
    email: '',
    estado:'',
    cidade: '',
    acessosCurso:'',
    situacaoCurso:'',
    inicioCurso:'',
  };

 
  componentDidMount() {
    this.loadRepositories();
  }

  loadRepositories = async () => {
    if (this.state.loading){
      return;
    } 
    const {pag} = this.state
    this.setState({ loading: true });
      

    const response = await fetch(`http://dev.labtime.ufg.br/selecao_2020/user?page=${pag}`);
    
    const repositories = await response.json();
    
   

    this.setState(
      (prevState, nextProps) => ({
        pag: prevState.pag + 1,
        loading: true,
        refreshing: true
      })
    );
      
    //repositeres.-o que quero pegar-
    try{
      this.setState({
        data: [ ...this.state.data, ...repositories.resultados],
        loading: false,
        refreshing: false,
      });
    }catch{
      console.log("Erro");
    }
   
  }

 
  //para aparecer o ícone de carregamento de tela na parte de baixo
  renderFooter = () => {
    if (!this.state.loading) {
      return null;
    }
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>

    );
  };
  //para aparecer o ícone de carregamento de tela na parte de cima,para atualizar a página
  renderRefresh = () => {
    this.setState(
      {
        page: 1,
        refreshing: true
      },
      () => {
        this.loadRepositories();
      }
    );
  };
 ;

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  render() {
    
    const { modalVisible } = this.state;
    const {id, name, apelido, nascimento, codigo, sexo, email, estado, cidade, acessosCurso,situacaoCurso, inicioCurso } = this.state;
    
    return ( 
    
      <View style={styles.centeredView}>

            
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}  
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
           
            <Text style={styles.modalText}>Nome: {name}</Text>
            <Text style={styles.modalText}>Apelido: {apelido}</Text>
            <Text style={styles.modalText}>Nascimento: {nascimento}</Text>
            <Text style={styles.modalText}>Código: {codigo}    Id: {id}    Sexo: {sexo}  </Text>
            <Text style={styles.modalText}>E-mail: {email}</Text>
            <Text style={styles.modalText}>Estado: {estado}</Text>
            <Text style={styles.modalText}>Cidade: {cidade}</Text>
            <Text style={styles.modalText}>AcessosCurso: {acessosCurso}</Text>
            <Text style={styles.modalText}>Situação do Curso: {situacaoCurso}</Text>
            <Text style={styles.modalText}>Início do curso: {inicioCurso}</Text>
            
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                this.setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Voltar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      
      

    <FlatList
        onRefresh={this.renderRefresh}
        refreshing={this.state.refreshing}
        onEndReached={this.loadRepositories}
        onEndReachedThreshold={0.05}
        ListFooterComponent={this.renderFooter}
        style={{ marginTop: 30 }}
        contentContainerStyle={styles.list}
        data={this.state.data}
        renderItem={({item}) => (
          <TouchableWithoutFeedback onPress={ () =>  this.showModal(item)}>
              <View style={styles.listItem}>
                 <Text style={styles.listText}>{item.nome}</Text>
                 <Text style={styles.listText}>{item.email}</Text>
              </View>
         </TouchableWithoutFeedback>
          )}
        keyExtractor={(item, index) => item.id.toString()}
      />

      </View>
    );
  }

  showModal(item) {
    this.setModalVisible(true);

    this.setState({id : item.id});
    this.setState({name : item.nome});
    this.setState({apelido : item.apelido});
    this.setState({nascimento : item.nascimento});
    this.setState({codigo : item.codigo});
    this.setState({sexo : item.sexo});
    this.setState({email : item.email});
    this.setState({estado : item.estado});
    this.setState({cidade : item.cidade});
    this.setState({acessosCurso : item.acessosCurso});
    this.setState({situacaoCurso : item.situacaoCurso});
    this.setState({inicioCurso : item.inicioCurso});
    
    console.log('Selected Item :',item);
  }
}



const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
   // alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    //alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
    //textAlign: "center"
  },
  list: {
    paddingHorizontal: 20,
  },
  listItem: {
    backgroundColor: '#EEE',
    marginTop: 20,
    padding: 20,
  },
  listText:{
    fontSize: 20,
  },

});

export default App;