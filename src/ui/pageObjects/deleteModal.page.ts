import { SalesPortalPage } from "./salesPortal.page";

export class DeleteModal extends SalesPortalPage {
  readonly headerOfDeleteModal = this.page.locator("h5.modal-title d-flex justify-content-start align-items-center");
  readonly uniqueElement = this.headerOfDeleteModal;
  readonly deleteButton = this.page.getByText("Yes, Delete");
  readonly cancelButton = this.page.locator('button[data-bs-dismiss="modal"]');
  readonly closeModalButton = this.page.locator(".btn-close hover-danger");

  async clickOnDeleteButton() {
    await this.deleteButton.click();
  }
}
