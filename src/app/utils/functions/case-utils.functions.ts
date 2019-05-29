import * as html2 from 'html2canvas';

export class CaseUtilsFunctions {
  public static generateComponentId() {
    return (
      '_' +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  }

  public static exportCase(htmlElement: HTMLElement) {
    htmlElement.style.transform = `scale(${875 / htmlElement.offsetWidth}, ${1840 / htmlElement.offsetHeight})`;
    const data = html2(htmlElement, { windowWidth: 875, width: 875, windowHeight: 1840, height: 1840, scale: 1 }).then(canvas => {
      const img = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      const fileName = 'vct_illustration.png';

      downloadLink.href = img;
      downloadLink.download = fileName;
      downloadLink.click();
      htmlElement.style.transform = `scale(1)`;
    });
  }
}
