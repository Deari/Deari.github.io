const RenderUploadImage = (props) => (
  <div className="form-row">
    <label>应用图片</label>
    <div className="row-right">
      <p>请上传应用高清图片</p>
      <p>400*400像素，仅支持PNG格式，大小不超过300KB</p>
      <span>
        <input type="button" value="选择文件" />
        <input type="file" accept="image/*" ref='appLogo' onChange={props.imageUpload} />
      </span>
      <div className="img-container">
        <img src={props.imageUrl} alt="上传图片" className="img-thumbnail" />
      </div>
    </div>
  </div>
)
export default RenderUploadImage;