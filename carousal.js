let imageIds = [];
class ModalComponent {
  constructor(params) {
    let { modalTitle, modalbodycontent, modalId } = params;
    this.modalId = modalId;
    this.closeFunctionCallback = (e) => this.keyBoardNavigation(e, this.modalId);
    let modalParentElement = document.createElement("div");
    modalParentElement.setAttribute("id", modalId);
    // modal overlay
    let modalOverlayElement = document.createElement("div");
    modalOverlayElement.classList.add("modal-overlay");
    modalOverlayElement.addEventListener("click", (event) => {
      console.log("click on overlay");
      if (event.target.classList.contains("modal-overlay")) {
        this.closeFunction(event, this.modalId);
      }
    });
    modalParentElement.appendChild(modalOverlayElement);
    // modal component
    let modalElement = document.createElement("div");
    modalElement.classList.add("modal");
    // add header
    // modalElement.appendChild(this.createHeader({ modalTitle }));

    
    let prevBtn = document.createElement("button");
    prevBtn.textContent = "<";
    prevBtn.classList.add('nav-button');
    prevBtn.addEventListener("click", (event) =>
      this.swapModal({event, prev: true})
    );

    modalElement.appendChild(prevBtn);

    let nxtBtn = document.createElement("button");
    nxtBtn.textContent = ">";
    nxtBtn.classList.add('nav-button');
    nxtBtn.addEventListener("click", (event) =>
    //   this.closeFunction(event, this.modalId)
    this.swapModal({event})
    );

    // add body
    modalElement.appendChild(this.createModalBody({ modalbodycontent }));

    modalElement.appendChild(nxtBtn);

    // add footer
    // modalElement.appendChild(this.createFooter());

    modalOverlayElement.appendChild(modalElement);

    this.modalParentElement = modalParentElement;
  }

  createModalBody({ modalbodycontent }) {
    let modalbody = document.createElement("div");
    modalbody.classList.add("modal-body");
    let imgElement = document.createElement('img');
    imgElement.setAttribute('src', `./images/${this.modalId}.jpg`);
    modalbody.appendChild(imgElement);
    return modalbody;
  }

  createHeader({ modalTitle }) {
    let headerElement = document.createElement("div");
    headerElement.classList.add("header");
    headerElement.setAttribute("id", "modal-header");

    //header content
    let contentNode = document.createElement("span");
    contentNode.classList.add("header-body");
    contentNode.textContent = modalTitle;

    headerElement.appendChild(contentNode);

    //close button
    let closeBtn = document.createElement("button");
    closeBtn.setAttribute("id", "modalCloseBtn");
    closeBtn.textContent = "x";
    closeBtn.addEventListener("click", (event) =>
      this.closeFunction(event, this.modalId)
    );

    headerElement.appendChild(closeBtn);

    return headerElement;
  }
  openModal() {
    document
      .getElementsByTagName("body")[0]
      .appendChild(this.modalParentElement);
    document.addEventListener("keydown", this.closeFunctionCallback);
  }

  closeFunction(event, modalId) {
    let modalElement = document.querySelector(`#${modalId}`);
    modalElement.remove();
    console.log("closing button click!!");
    document.removeEventListener("keydown", this.closeFunctionCallback);
    event.stopPropagation();
  }

  keyBoardNavigation(e, modalId) {
    if (e.key === "Escape") {
      console.log("Escape key pressed");
      let modalElement = document.querySelector(`#${modalId}`);
      if (modalElement) {
        this.closeFunction(event, this.modalId);
        console.log("Modal closed");
      }
    } else if (e.key === 'ArrowRight') {
        this.swapModal({event: e});
    } else if (e.key === 'ArrowLeft') {
        this.swapModal({event: e, prev: true});
    }
  }

  createFooter() {
    let footerElement = document.createElement("div");
    footerElement.classList.add("header");
    footerElement.setAttribute("id", "modal-footer");

    return footerElement;
  }

  swapModal({ event, prev = false }) {
    let currentImgIndex = imageIds.indexOf(this.modalId);
    let nextImg = imageIds[prev ? currentImgIndex-1 : currentImgIndex+1];
    if (nextImg) {
        let modalElement = new ModalComponent({
            modalId: nextImg,
            modalbodycontent: ''
          });
        modalElement.openModal();
        this.closeFunction(event, this.modalId);
    }
  }
}

let carousalBox = document.getElementById("carousal-box");
for (let i = 1; i <= 30; i++) {
  let imgElement = document.createElement("img");
  imgElement.setAttribute("src", `./images/image-${i}.jpg`);
  imgElement.classList.add('img-class');
  imageIds.push(`image-${i}`);
  imgElement.addEventListener("click", function() {
    let modalElement = new ModalComponent({
        modalId: 'image-'+i,
        modalbodycontent: ''
      });
    modalElement.openModal();
  });
  carousalBox.appendChild(imgElement);

}


