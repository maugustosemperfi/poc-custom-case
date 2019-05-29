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

  public static exportCase(htmlElement: HTMLElement, isMobile: boolean) {
    let options;

    if (isMobile) {
      htmlElement.style.transform = `scale(${875 / htmlElement.offsetWidth}, ${1840 / htmlElement.offsetHeight})`;
      options = { windowWidth: 875, width: 875, windowHeight: 1840, height: 1840 };
    } else {
      options = { windowWidth: 875, windowHeight: 1840 };
    }
    html2(htmlElement, options).then(canvas => {
      const img = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      const fileName = 'custom_case.png';

      downloadLink.href = img;
      downloadLink.download = fileName;
      downloadLink.click();
      htmlElement.style.transform = `scale(1)`;
    });
  }
}
