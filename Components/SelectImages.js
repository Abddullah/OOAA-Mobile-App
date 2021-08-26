import React, { Component } from 'react';
import {
    StyleSheet,
    Text, Image,
    View, TouchableOpacity, TextInput,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import DocumentPicker from 'react-native-document-picker';
// import ImagePicker from 'react-native-image-crop-picker';

export default class SelectImages extends Component {
    constructor() {
        super()
        this.state = {
            selectedImages: [],
            fileSystem: undefined,
        }
        _panResponder = {};
    }
    async browsImage() {

        try {
            const selectedImages = await DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.images],
            });
            for (const res of selectedImages) {
                console.log(
                    res.uri,
                    res.type, // mime type
                    res.name,
                    res.size
                );
                console.log(selectedImages, "selectedImages123")
                if (selectedImages.length > 16) {
                    selectedImages.splice(16)
                }
                this.setState({ selectedImages: selectedImages,fileSystem:true })
                this.props.func(selectedImages, "fileSystem")
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }

    }
    removeImage(index) {
        let selectedImagesClone = this.state.selectedImages
        selectedImagesClone.splice(index, 1);
        this.setState({
            selectedImages: selectedImagesClone
        })
        this.props.func(selectedImagesClone, this.props.editImage ? "uri" : "fileSystem")

    }
    componentWillMount() {
        let editImage = this.props.editImage
        console.log(editImage, "/*/*/*")
        this.setState({
            selectedImages: editImage
        })
        this.props.func(editImage, this.props.editImage ? "uri" : "fileSystem")

        // if (editImage) {
        //     let selectedImages = []
        //     console.log(editImage, "editImageeditImageeditImage")
        //     for (var key in editImage.productImage) {
        //         selectedImages.push({ uri: editImage.productImage[key] })
        //     }
        //     this.setState({
        //         selectedImages
        //     })
        //     console.log(selectedImages, "selectedImagesselectedImages")
        // }


    }
    render() {
        console.log(this.props.editImage, "this.props.editImage?")
        let { selectedImages } = this.state;
        return (
            <View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <TouchableOpacity
                        onPress={() => this.browsImage()}
                        style={styles.selectedImages}
                    >
                        {
                            <>
                                <MaterialIcons name='add-a-photo' style={{ color: "#6774FC", fontWeight: "bold", fontSize: 35 }} />
                                <Text style={{ color: "#6774FC", fontSize: 12 }}>Add Photo</Text>
                            </>
                        }
                    </TouchableOpacity>
                    <View
                        // onPress={() => this.browsImage()}
                        style={[styles.selectedImages, { borderColor: "#878C8A" }]}>
                        {selectedImages && selectedImages[0] && selectedImages[0] &&
                            <TouchableOpacity onPress={() => this.removeImage(0)} style={styles.crosIcon}>
                                <Text style={styles.text}>X</Text>
                            </TouchableOpacity>
                        }
                        {(selectedImages && selectedImages[0] && selectedImages[0]) ?
                            (
                                <Image
                                    style={{ width: 75, height: 75 }}
                                    source={{ uri: this.props.editImage&&this.state.fileSystem===undefined ? selectedImages[0] : selectedImages[0].uri }}
                                />
                            ) :
                            (
                                <Entypo name='image' style={{ color: "#878C8A", fontWeight: "bold", fontSize: 35, }} />
                            )}
                    </View>


                    <View
                        // onPress={() => this.browsImage()}
                        style={[styles.selectedImages, { borderColor: "#878C8A" }]}>
                        {selectedImages && selectedImages[1] && selectedImages[1] &&
                            <TouchableOpacity onPress={() => this.removeImage(1)} style={styles.crosIcon}>
                                <Text style={styles.text}>X</Text>
                            </TouchableOpacity>
                        }
                        {(selectedImages && selectedImages[1] && selectedImages[1]) ?
                            (
                                <Image
                                    style={{ width: 75, height: 75 }}
                                    source={{ uri:this.props.editImage&&this.state.fileSystem===undefined ? selectedImages[1] :selectedImages[1].uri }}
                                />
                            ) :
                            (
                                <Entypo name='image' style={{ color: "#878C8A", fontWeight: "bold", fontSize: 35, }} />
                            )}
                    </View>



                    <View
                        // onPress={() => this.browsImage()}
                        style={[styles.selectedImages, { borderColor: "#878C8A" }]}>
                        {selectedImages && selectedImages[2] && selectedImages[2] &&
                            <TouchableOpacity onPress={() => this.removeImage(2)} style={styles.crosIcon}>
                                <Text style={styles.text}>X</Text>
                            </TouchableOpacity>
                        }
                        {(selectedImages && selectedImages[2] && selectedImages[2]) ?
                            (
                                <Image
                                    style={{ width: 75, height: 75 }}
                                    source={{ uri:this.props.editImage&&this.state.fileSystem===undefined ? selectedImages[2] : selectedImages[2].uri }}
                                />
                            ) :
                            (
                                <Entypo name='image' style={{ color: "#878C8A", fontWeight: "bold", fontSize: 35, }} />
                            )}
                    </View>


                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 8 }}>
                    <View
                        // onPress={() => this.browsImage()}
                        style={[styles.selectedImages, { borderColor: "#878C8A" }]}>
                        {selectedImages && selectedImages[3] && selectedImages[3] &&
                            <TouchableOpacity onPress={() => this.removeImage(3)} style={styles.crosIcon}>
                                <Text style={styles.text}>X</Text>
                            </TouchableOpacity>
                        }
                        {(selectedImages && selectedImages[3] && selectedImages[3]) ?
                            (
                                <Image
                                    style={{ width: 75, height: 75 }}
                                    source={{ uri:this.props.editImage&&this.state.fileSystem===undefined ? selectedImages[3] : selectedImages[3].uri }}
                                />
                            ) :
                            (
                                <Entypo name='image' style={{ color: "#878C8A", fontWeight: "bold", fontSize: 35, }} />
                            )}
                    </View>


                    <View
                        // onPress={() => this.browsImage()}
                        style={[styles.selectedImages, { borderColor: "#878C8A" }]}>
                        {selectedImages && selectedImages[4] && selectedImages[4] &&
                            <TouchableOpacity onPress={() => this.removeImage(4)} style={styles.crosIcon}>
                                <Text style={styles.text}>X</Text>
                            </TouchableOpacity>
                        }
                        {(selectedImages && selectedImages[4] && selectedImages[4]) ?
                            (
                                <Image
                                    style={{ width: 75, height: 75 }}
                                    source={{ uri:this.props.editImage&&this.state.fileSystem===undefined ? selectedImages[4] : selectedImages[4].uri }}
                                />
                            ) :
                            (
                                <Entypo name='image' style={{ color: "#878C8A", fontWeight: "bold", fontSize: 35, }} />
                            )}
                    </View>



                    <View
                        // onPress={() => this.browsImage()}
                        style={[styles.selectedImages, { borderColor: "#878C8A" }]}>
                        {selectedImages && selectedImages[5] && selectedImages[5] &&
                            <TouchableOpacity onPress={() => this.removeImage(5)} style={styles.crosIcon}>
                                <Text style={styles.text}>X</Text>
                            </TouchableOpacity>
                        }
                        {(selectedImages && selectedImages[5] && selectedImages[5]) ?
                            (
                                <Image
                                    style={{ width: 75, height: 75 }}
                                    source={{ uri: this.props.editImage&&this.state.fileSystem===undefined ? selectedImages[5] :selectedImages[5].uri }}
                                />
                            ) :
                            (
                                <Entypo name='image' style={{ color: "#878C8A", fontWeight: "bold", fontSize: 35, }} />
                            )}
                    </View>

                    <View
                        onPress={() => this.browsImage()}
                        style={[styles.selectedImages, { borderColor: "#878C8A" }]}>
                        {selectedImages && selectedImages[6] && selectedImages[6] &&
                            <TouchableOpacity onPress={() => this.removeImage(6)} style={styles.crosIcon}>
                                <Text style={styles.text}>X</Text>
                            </TouchableOpacity>
                        }
                        {(selectedImages && selectedImages[6] && selectedImages[6]) ?
                            (
                                <Image
                                    style={{ width: 75, height: 75 }}
                                    source={{ uri:this.props.editImage&&this.state.fileSystem===undefined ? selectedImages[6] : selectedImages[6].uri }}
                                />
                            ) :
                            (
                                <Entypo name='image' style={{ color: "#878C8A", fontWeight: "bold", fontSize: 35, }} />

                            )}
                    </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 8 }}>
                    <View
                        // onPress={() => this.browsImage()}
                        style={[styles.selectedImages, { borderColor: "#878C8A" }]}>
                        {selectedImages && selectedImages[7] && selectedImages[7] &&
                            <TouchableOpacity onPress={() => this.removeImage(7)} style={styles.crosIcon}>
                                <Text style={styles.text}>X</Text>
                            </TouchableOpacity>
                        }
                        {(selectedImages && selectedImages[7] && selectedImages[7]) ?
                            (
                                <Image
                                    style={{ width: 75, height: 75 }}
                                    source={{ uri:this.props.editImage&&this.state.fileSystem===undefined ? selectedImages[7] : selectedImages[7].uri }}
                                />
                            ) :
                            (
                                <Entypo name='image' style={{ color: "#878C8A", fontWeight: "bold", fontSize: 35, }} />
                            )}
                    </View>


                    <View
                        // onPress={() => this.browsImage()}
                        style={[styles.selectedImages, { borderColor: "#878C8A" }]}>
                        {selectedImages && selectedImages[8] && selectedImages[8] &&
                            <TouchableOpacity onPress={() => this.removeImage(8)} style={styles.crosIcon}>
                                <Text style={styles.text}>X</Text>
                            </TouchableOpacity>
                        }
                        {(selectedImages && selectedImages[8] && selectedImages[8]) ?
                            (
                                <Image
                                    style={{ width: 75, height: 75 }}
                                    source={{ uri: this.props.editImage&&this.state.fileSystem===undefined ? selectedImages[8] :selectedImages[8].uri }}
                                />
                            ) :
                            (
                                <Entypo name='image' style={{ color: "#878C8A", fontWeight: "bold", fontSize: 35, }} />
                            )}
                    </View>



                    <View
                        // onPress={() => this.browsImage()}
                        style={[styles.selectedImages, { borderColor: "#878C8A" }]}>
                        {selectedImages && selectedImages[9] && selectedImages[9] &&
                            <TouchableOpacity onPress={() => this.removeImage(9)} style={styles.crosIcon}>
                                <Text style={styles.text}>X</Text>
                            </TouchableOpacity>
                        }
                        {(selectedImages && selectedImages[9] && selectedImages[9]) ?
                            (
                                <Image
                                    style={{ width: 75, height: 75 }}
                                    source={{ uri:this.props.editImage&&this.state.fileSystem===undefined ? selectedImages[9] : selectedImages[9].uri }}
                                />
                            ) :
                            (
                                <Entypo name='image' style={{ color: "#878C8A", fontWeight: "bold", fontSize: 35, }} />
                            )}
                    </View>

                    <View
                        onPress={() => this.browsImage()}
                        style={[styles.selectedImages, { borderColor: "#878C8A" }]}>
                        {selectedImages && selectedImages[10] && selectedImages[10] &&
                            <TouchableOpacity onPress={() => this.removeImage(10)} style={styles.crosIcon}>
                                <Text style={styles.text}>X</Text>
                            </TouchableOpacity>
                        }
                        {(selectedImages && selectedImages[10] && selectedImages[10]) ?
                            (
                                <Image
                                    style={{ width: 75, height: 75 }}
                                    source={{ uri:this.props.editImage&&this.state.fileSystem===undefined ? selectedImages[10] : selectedImages[10].uri }}
                                />
                            ) :
                            (
                                <Entypo name='image' style={{ color: "#878C8A", fontWeight: "bold", fontSize: 35, }} />

                            )}
                    </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 8 }}>
                    <View
                        // onPress={() => this.browsImage()}
                        style={[styles.selectedImages, { borderColor: "#878C8A" }]}>
                        {selectedImages && selectedImages[11] && selectedImages[11] &&
                            <TouchableOpacity onPress={() => this.removeImage(11)} style={styles.crosIcon}>
                                <Text style={styles.text}>X</Text>
                            </TouchableOpacity>
                        }
                        {(selectedImages && selectedImages[11] && selectedImages[11]) ?
                            (
                                <Image
                                    style={{ width: 75, height: 75 }}
                                    source={{ uri:this.props.editImage&&this.state.fileSystem===undefined ? selectedImages[11] : selectedImages[11].uri }}
                                />
                            ) :
                            (
                                <Entypo name='image' style={{ color: "#878C8A", fontWeight: "bold", fontSize: 35, }} />
                            )}
                    </View>


                    <View
                        // onPress={() => this.browsImage()}
                        style={[styles.selectedImages, { borderColor: "#878C8A" }]}>
                        {selectedImages && selectedImages[12] && selectedImages[12] &&
                            <TouchableOpacity onPress={() => this.removeImage(12)} style={styles.crosIcon}>
                                <Text style={styles.text}>X</Text>
                            </TouchableOpacity>
                        }
                        {(selectedImages && selectedImages[12] && selectedImages[12]) ?
                            (
                                <Image
                                    style={{ width: 75, height: 75 }}
                                    source={{ uri:this.props.editImage&&this.state.fileSystem===undefined ? selectedImages[12] : selectedImages[12].uri }}
                                />
                            ) :
                            (
                                <Entypo name='image' style={{ color: "#878C8A", fontWeight: "bold", fontSize: 35, }} />
                            )}
                    </View>



                    <View
                        // onPress={() => this.browsImage()}
                        style={[styles.selectedImages, { borderColor: "#878C8A" }]}>
                        {selectedImages && selectedImages[13] && selectedImages[13] &&
                            <TouchableOpacity onPress={() => this.removeImage(13)} style={styles.crosIcon}>
                                <Text style={styles.text}>X</Text>
                            </TouchableOpacity>
                        }
                        {(selectedImages && selectedImages[13] && selectedImages[13]) ?
                            (
                                <Image
                                    style={{ width: 75, height: 75 }}
                                    source={{ uri: this.props.editImage&&this.state.fileSystem===undefined ? selectedImages[13] :selectedImages[13].uri }}
                                />
                            ) :
                            (
                                <Entypo name='image' style={{ color: "#878C8A", fontWeight: "bold", fontSize: 35, }} />
                            )}
                    </View>

                    <View
                        onPress={() => this.browsImage()}
                        style={[styles.selectedImages, { borderColor: "#878C8A" }]}>
                        {selectedImages && selectedImages[14] && selectedImages[14] &&
                            <TouchableOpacity onPress={() => this.removeImage(14)} style={styles.crosIcon}>
                                <Text style={styles.text}>X</Text>
                            </TouchableOpacity>
                        }
                        {(selectedImages && selectedImages[14] && selectedImages[14]) ?
                            (
                                <Image
                                    style={{ width: 75, height: 75 }}
                                    source={{ uri:this.props.editImage&&this.state.fileSystem===undefined ? selectedImages[14] : selectedImages[14].uri }}
                                />
                            ) :
                            (
                                <Entypo name='image' style={{ color: "#878C8A", fontWeight: "bold", fontSize: 35, }} />

                            )}
                    </View>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    selectedImages: {
        width: 75, height: 75, borderColor: "#6774FC", borderWidth: 0.3, justifyContent: "center", alignItems: 'center'
    },
    crosIcon: {
        width: 30, height: 30, position: "absolute", zIndex: 1, right: 0, top: 0
    },
    text: {
        textAlign: "center", color: "red", fontWeight: "bold", fontSize: 17
    },

});