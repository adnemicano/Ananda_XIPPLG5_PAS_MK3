var selectedRow = null;

// menampilkan alert
function showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// menghapus semua
function clearFields() {
    document.querySelector("#namaBarang").value = "";
    document.querySelector("#hargaBarang").value = "";
    document.querySelector("#stokBarang").value = "";

}

// tambah data
document.querySelector("#barang-form").addEventListener("submit", (e) => {
    e.preventDefault();

    // ambil dari data
    const namaBarang = document.querySelector("#namaBarang").value;
    const hargaBarang = document.querySelector("#hargaBarang").value;
    const stokBarang = document.querySelector("#stokBarang").value;

    // validasi
    if (namaBarang == "" || hargaBarang == "" || stokBarang == "") {
        showAlert("Tabel harus diisi", "danger");
    }
    else {
        if (selectedRow == null) {
            const list = document.querySelector("#list-barang");
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${namaBarang}</td>
                <td>${hargaBarang}</td>
                <td>${stokBarang}</td>
                <td>
                <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlert("Barang ditambahkan", "succes");
        }
        else {
            selectedRow.children[0].textContent = namaBarang;
            selectedRow.children[1].textContent = hargaBarang;
            selectedRow.children[2].textContent = stokBarang;
            selectedRow = null;
            showAlert("Data diubah", "info");
        }

        clearFields();
    }
})

// edit data
document.querySelector("#list-barang").addEventListener("click", (e) =>{
    target = e.target;
    if(target.classList.contains("edit")){
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#namaBarang").value = selectedRow.children[0].textContent;
        document.querySelector("#hargaBarang").value = selectedRow.children[1].textContent;
        document.querySelector("#stokBarang").value = selectedRow.children[2].textContent;
    }
})

// hapus data
document.querySelector("#list-barang").addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("delete")) {
        target.parentElement.parentElement.remove();
        showAlert("Data barang dihapus", "danger");
    }
})