<template>
  <div class="login">
    <h2 class="title">用户登录中心</h2>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      label-position="left"
    >
      <el-form-item prop="loginName" class="form-item">
        <el-input
          ref="loginName"
          v-model="loginForm.loginName"
          placeholder="请输入账号"
          name="loginName"
          type="text"
          tabindex="1"
          autocomplete="on"
        >
          <img slot="prefix" src="@/assets/mobile/login/user.png" class="icon">
        </el-input>
      </el-form-item>
      <el-form-item prop="password" class="form-item">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          autocomplete="on"
          @keyup.enter.native="handleLogin"
        >
          <img slot="prefix" src="@/assets/mobile/login/psw.png" class="icon"/>
          <img
            slot="suffix"
            @click="showPwd"
            :src='"@/assets/mobile/login/eye"+(passwordType==="password"?"":"-open")+".png"'
            class="icon"/>
        </el-input>
      </el-form-item>
      <el-form-item prop="code" class="form-item">
        <el-row>
          <el-col :span="16">
            <el-input
              ref="code"
              v-model.trim="loginForm.loginIdentify"
              placeholder="请输入验证码"
              name="code"
              type="text"
              tabindex="3"
              @keyup.enter.native="handleLogin"
            >
              <img slot="prefix" src="@/assets/mobile/login/lock.png" class="icon">
            </el-input>
          </el-col>
          <el-col :span="8" style="padding-left: 5px;">
            <img :src="indetifyCode" alt="" style="width: 100%; height: 28px;" @click="makeCode">
          </el-col>
        </el-row>
        <el-row class="agree">
          <el-checkbox v-model="agree" label="同意"/>
          <span class="agreement" @click="dialogVisible=true">《中国联通用户隐私政策》</span>
        </el-row>
        <el-row class="footer">
          <el-col :span="12">
            <el-button class="btn applicate" size="medium" @click="hanleApplicate">申请入党</el-button>
          </el-col>
          <el-col :span="12">
<!--            <el-button-->
<!--              :loading="loading"-->
<!--              type="danger"-->
<!--              class="btn"-->
<!--              size="medium"-->
<!--              @click="handleLogin"-->
<!--            >-->
<!--              登录-->
<!--            </el-button>-->
            <el-button
              :loading="loading"
              class="btn loginBtn"
              size="medium"
              @click="handleLogin"
            >
              登录
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <el-dialog
      title="登录协议"
      :visible.sync="dialogVisible"
      width="50%"
      max-height="500px"
      class=""
    >
      <el-form>
        <el-form-item>
          <h2 class="agreement_head" style="text-align: center">中国联通智慧党建用户隐私政策</h2>
          <p class="entry">
            中国联通（下面称为“我们”）非常重视用户的隐私和个人信息保护，致力于维持您对我们的信任。我们承诺采取相应的安全保护措施来保护您的个人信息。请在使用我们的移动业务、宽带业务、固话业务、融合业务、IDC服务、ICT服务、云计算服务、大数据服务、物联网服务等各项产品或服务（以下统称“我们的产品或服务”）前，仔细阅读并了解《中国联通用户隐私政策》（“本隐私政策”）。
            在您仔细阅读完并充分理解我们用户隐私政策后，请您选择“不同意”或“同意并继续”，当您选择“不同意”后将会退出本系统，当您选择“同意并继续”后将可继续使用本系统。另外本系统有涉及到病患信息，请注意保护病患信息，严禁泄露病患信息。
            您在使用我们的产品或服务时，我们需要按照实名制等国家法律法规及监管政策的相关要求收集、存储、使用、共享您的信息，以及向您提供服务及提升服务质量，我们希望通过本隐私政策向您说明：在您使用我们的产品或服务时，我们会收集哪些数据、为什么收集这些数据、会利用这些数据做什么以及我们如何保护这些数据。
            本隐私政策与您所使用的我们的产品或服务息息相关，对于您行使个人权利及保护您的个人信息至关重要，请您在使用我们的产品或服务前认真阅读并充分理解本政策所写明的内容。
            阅读过程中，如您对我们的隐私政策及服务条款的内容有任何疑问，请联系我们。一旦您开始使用我们的产品或服务，即表示您已经理解并同意本隐私政策全部内容。您使用或在我们更新本隐私政策后（我们会及时提示您更新的情况）继续使用我们的产品或服务，即意味着您同意本隐私政策(含更新版本)内容，并且同意我们按照本隐私政策收集、使用、保存和共享您的相关信息。
          </p>
          <p class="entry">本隐私政策包含以下内容：我们如何收集和使用您的个人信息；我们如何使用 Cookie 和同类技术；我们如何共享、转让、公开披露您的个人信息；我们如何保护您的个人信息；
            我们如何处理儿童的个人信息；您的个人信息如何存储及在全球范围转移；本政策如何更新；您的权利；如何联系我们。
          </p>
          <p class="entryHeader">一、我们如何收集和使用个人信息</p>
          <p class="entry">个人信息是指以电子或者其他方式记录的能够单独或者与其他信息结合识别特定自然人身份或者反映特定自然人活动情况的各种信息。</p>
          <p class="entry">（一）为更好地为您提供服务，中国联通将遵循“合法、正当、必要”原则，按照相关法律法规及监管政策的规定收集和使用如下您的个人信息：</p>
          <p class="entry">1.用户登记的个人身份信息</p>
          <p class="entry">
            根据《电话用户真实身份信息登记规定》（工业和信息化部令第25号），您在办理入网手续时须向我们出示有效证件、提供真实身份信息；同时，为了验证该类信息的准确性和完整性，我们会将您提供的信息与合法存有您信息的机构（政府机关、事业单位、商业机构）进行验证核对；通过核验后，我们将通过识别仪、高拍仪、纸质/电子表单等方式对您的个人身份信息进行登记，拍照或在线视频留存办理手续。留存的个人身份信息主要包括：个人身份及网络身份标识鉴权信息[主要包括个人用户姓名、有效通信联系方式、有效证件类型及号码、证件登记信息、装机地址、交费账号、电子邮箱、拍照人像、服务账号及密码、密码保护答案、办理的业务]。如您拒绝提供个人有效证件及真实信息，将无法办理入网手续，无法使用我们的产品或服务。
          </p>
          <p class="entry">2.使用服务过程中自主上传产生的服务数据</p>
          <p class="entry">
            您在使用我们的产品或服务过程中会上传和产生的服务数据，主要包括通话内容、短信/彩信、邮件信息、通讯录、好友/群组列表、网盘存储内容、发布内容，这些服务数据由您自主选择上传产生，我们只提供相关设备存储，我们不使用相关信息内容，您可以凭借服务账号及密码等网络身份鉴权后浏览查阅。
          </p>
          <p class="entry">3.使用我们的产品或服务过程中产生的日志信息</p>
          <p class="entry">
            为了确保您能正常使用我们的服务，并实现计费收费准确等目的，在您使用通信和互联网信息服务过程中我们通过基站、交换机、终端等自动采集产生的日志信息[主要包括订购信息、服务详单（通话费详单、点对点短信和点对点彩信费详单、增值业务费详单、手机上网流量费详单、无线上网卡流量费详单、宽带上网详单、WLAN流量费详单、查询记录、上网记录、网购记录）、使用记录、消费信息、账单、位置信息、终端信息]。订购信息主要为用户使用通信服务和互联网服务时签订的入网/变更/终止各类登记资料、协议或合同，以及订购套餐、增值业务信息。消费信息主要为账单信息、缴费信息、欠费信息、账户余额变动信息、账户信息、信用额度综合级账务信息。终端信息主要为硬件型号、设备MAC地址、操作系统类型、软件列表唯一设备识别码（如IMEI/android
            ID/IDFA/OPENUDID/GUID、SIM卡IMSI信息在内的描述个人设备基本情况的信息。个人上网记录主要包括网站浏览记录、软件使用记录、点击记录信息。位置信息主要包括基站定位信息、经纬度信息。
          </p>
          <p class="entry">
            4.为共同向您提供产品服务或改进产品服务的质量或出于对产品服务安全性的考量等合理需要，我们可能按照相关法律法规及监管政策的要求或经过您的授权从关联公司、合作伙伴及其他受信任的第三方接收您的个人信息及其他信息。例如当您通过我们关联公司、业务合作伙伴网站订购我们的产品，您向其提供的预订信息可能会转交给我们，以便我们处理您的订单。
          </p>
          <p class="entry">5.在采集过程中，我们将严格遵守相关法律法规及监管政策，不采集任何法律法规及监管政策禁止采集的信息。</p>
          <p class="entry">6.您了解并同意，以下情形中我们使用个人信息无需征得您的授权同意：</p>
          <p class="entry">（1）与国家安全、国防安全有关的；</p>
          <p class="entry">（2）与公共安全、公共卫生、重大公共利益有关的；</p>
          <p class="entry">（3）与犯罪侦查、起诉、审判和判决执行等有关的；</p>
          <p class="entry">（4）出于维护个人信息主体或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；</p>
          <p class="entry">（5）所收集的个人信息是个人信息主体自行向社会公众公开的；</p>
          <p class="entry">（6）从合法公开披露的信息中收集的您的个人信息的，如合法的新闻报道、政府信息公开等渠道；</p>
          <p class="entry">（7）根据您的要求签订和履行合同所必需的；</p>
          <p class="entry">（8）用于维护所提供的产品或服务的安全稳定运行所必需的，例如发现、处置产品或服务的故障；</p>
          <p class="entry">（9）法律法规及监管政策规定的其他情形。</p>
          <p class="entry">（二）为向您提供服务及改善服务质量，在遵守国家法律法规及监管政策的前提下，我们可能将收集到的您的个人信息用于以下目的：</p>
          <p class="entry">1.为您提供服务</p>
          <p class="entry">（1）在我们提供服务时，用于身份验证、客户服务、安全防范、诈骗监测、存档和备份用途，确保我们向您提供的产品和服务的安全性；</p>
          <p class="entry">（2）通过信息数据分析，帮助我们设计为您提供更好感知的新服务，改善我们现有服务；</p>
          <p class="entry">（3）根据国家相关要求，用于旨在推进政府管理、加强社会治理、改善社会民生、建立诚信体系等目的的服务；</p>
          <p class="entry">（4）使我们更加了解您如何使用我们的服务，从而针对性地满足您的个性化需求，例如语言设定、位置设定、个性化的帮助服务和指示，或对您和其他使用我们服务的用户做出其他方面的回应；</p>
          <p class="entry">（5）用于向您提供个性化或定制化产品、服务或广告，例如向您展现或推荐相关程度更高信息流或者推广信息结果。如您不希望收到这些信息，可以按照我们的相关提示取消订阅；</p>
          <p class="entry">（6）评估我们服务中的广告和其他促销及推广活动的效果，并加以改善；</p>
          <p class="entry">（7）软件认证或管理软件升级；</p>
          <p class="entry">（8）邀请您参与有关我们产品和服务的调查。</p>
          <p class="entry">
            2.您了解并同意，我们可以通过技术手段对您的个人信息数据进行去标识化处理，去标识化处理的信息将无法识别个人主体。在此情况下我们有权使用已经去标识化的信息，并在符合相关法律法规及监管政策的前提下，我们有权对包括您的个人信息在内的用户数据库进行整体化分析和利用。
          </p>
          <p class="entry">3.当我们要将信息用于本政策未载明的其它用途时，会事先征求您的同意。</p>
          <p class="entryHeader">二、我们如何使用 Cookie 和同类技术</p>
          <p class="entry">（一）Cookie</p>
          <p class="entry">为确保网站正常运转，我们会在您的计算机或移动设备上存储名为
            Cookie的小数据文件。Cookie通常包含标识符、站点名称以及一些号码和字符。借助于Cookie，网站能够存储您的偏好或购物篮内的商品等数据。
            我们不会将Cookie用于本政策所述目的之外的任何用途。您可根据自己的偏好管理或删除Cookie。有关详情，请参见AboutCookies.org。您可以清除计算机上保存的所有Cookie，大部分网络浏览器都设有阻止Cookie的功能。但如果您这么做，则需要在每一次访问我们的网站时亲自更改用户设置。
          </p>
          <p class="entry">（二）网站信标和像素标签</p>
          <p class="entry">除Cookie外，我们还有可能会在网站上使用网站信标和像素标签等其他同类技术。例如，我们向您发送的电子邮件可能含有链接至我们网站内容的点击
            URL。如果您点击该链接，我们则会跟踪此次点击，帮助我们了解您的产品或服务偏好并改善客户服务。网站信标通常是一种嵌入到网站或电子邮件中的透明图像。借助于电子邮件中的像素标签，我们能够获知电子邮件是否被打开。如果您不希望自己的活动以这种方式被追踪，则可以随时从我们的寄信名单中退订
          </p>
          <p class="entry">（三）Do Not Track（请勿追踪）</p>
          <p class="entry">很多网络浏览器均设有“Do Not Track”（请勿追踪）功能，该功能可向网站发布“Do Not
            Track”请求。目前，主要互联网标准组织尚未设立相关政策来规定网站应如何应对此类请求。但如果您的浏览器启用了“Do Not Track”，那么我们的所有网站都会尊重您的选择。
          </p>
          <p class="entryHeader">三、我们如何共享、转让和公开披露个人信息</p>
          <p class="entry">（一）共享</p>
          <p class="entry">我们不会与中国联通以外的任何公司、组织和个人分享您的个人信息，但以下情况除外：
          </p>
          <p class="entry">1.在获取明确同意的情况下共享：获得您的明确同意后，我们会与其他方共享您的个人信息。
          </p>
          <p class="entry">2.我们可能会根据法律法规及监管政策要求，或按政府主管部门的强制性要求，对外共享您的个人信息。
          </p>
          <p class="entry">
            3.您授权银行、征信机构等第三方向我们查询、采集您在中国联通的信息，或者我们会在法律法规及监管政策允许范围内及您对第三方的授权范围内向第三方共享您的信息，我们会依据与第三方的约定、对个人信息来源的合法性进行确认后，在符合法律法规及监管政策的前提下，使用您的这些个人信息。
          </p>
          <p class="entry">
            4.与我们的关联公司共享：您的个人信息可能会与我们的关联公司共享。我们只会共享必要的个人信息，且受本隐私政策中所声明目的的约束。关联公司如要改变个人信息的处理目的，将再次征求您的授权同意。
            我们的关联公司包括中国联通现在或将来控制、受控制或与其处于共同控制下的任何公司、机构以及上述公司或机构的合法继承人。其中“控制”是指直接或间接地拥有影响所提及公司管理的能力，无论是通过所有权、有投票权的股份、合同或其他被人民法院认定的方式。
          </p>
          <p class="entry">
            5.与授权合作伙伴共享：仅为实现本政策中声明的目的，我们的某些服务将由授权合作伙伴提供。我们可能会与合作伙伴共享您的某些个人信息，以提供更好的客户服务和用户体验。例如，在您通过我们的网站购买商品或订购业务时，我们必须与物流服务提供商共享您的个人信息才能安排送货，或者安排合作伙伴提供服务。我们仅会出于合法、正当、必要、特定、明确的目的共享您的个人信息，并且只会共享提供服务所必要的个人信息。我们的合作伙伴无权将共享的个人信息用于任何其他用途。
            目前，我们的授权合作伙伴包括以下3大类型：</p>
          <p class="entry">
            （1）供应商、服务提供商和其他合作伙伴。我们将信息发送给支持我们业务的供应商、服务提供商和其他合作伙伴，这些支持包括提供技术基础设施服务、分析我们服务的使用方式、衡量广告和服务的有效性、提供客户服务、支付便利或进行学术研究和调查。
          </p>
          <p class="entry">（2）第三方商家。我们必须将您的订单信息与交易有关的必要信息与第三方商家共享来实现您向其购买商品或服务的需求，并促使其可以完成后续的售后服务。
          </p>
          <p class="entry">
            （3）广告、分析服务类的授权合作伙伴。除非得到您的许可，否则我们不会将您的个人身份信息（指可以识别您身份的信息，例如姓名或电子邮箱，通过这些信息可以联系到您或识别您的身份）与提供广告、分析服务的合作伙伴分享。但我们可能会将使用您的信息而形成的用户画像与提供广告、分析服务的合作伙伴共享，以帮助在不识别您个人的前提下提升广告及服务信息的有效触达率，向您提供与您更加相关的广告以替代普遍投放的广告。
            对我们与之共享个人信息的公司、组织和个人，我们会与其签署相应的保密协定，要求他们按照我们的说明、隐私政策以及其他任何相关的保密和安全措施来处理个人信息。
          </p>
          <p class="entry">（二）转让</p>
          <p class="entry">我们不会将您的个人信息转让给任何公司、组织和个人，但以下情况除外：
          </p>
          <p class="entry">1.在获取明确同意的情况下转让：获得您的明确同意后，我们会向其他方转让您的个人信息；
          </p>
          <p class="entry">2.在涉及合并、收购或破产清算时，如涉及到个人信息转让，我们会要求新的持有您个人信息的公司、组织继续受此隐私政策的约束，否则我们将要求该公司、组织重新向您征求授权同意；
          </p>
          <p class="entry">3.符合与您签署的相关协议或其他的法律法规文件约定所提供。</p>
          <p class="entry">（三）公开披露</p>
          <p class="entry">我们仅会在以下情况下，公开披露您的个人信息：</p>
          <p class="entry">1.获得您明确同意后；</p>
          <p class="entry">2.基于法律的披露：在法律、法律程序、诉讼或政府主管部门强制性要求的情况下，我们可能会公开披露您的个人信息。
          </p>
          <p class="entryHeader">四、我们如何保护您的个人信息</p>
          <p class="entry">
            （一）我们已使用符合业界标准的安全防护措施保护您提供的个人信息，防止数据遭到未经授权访问、公开披露、使用、修改、损坏或丢失。我们将采取一切合理可行的措施，（例如身份鉴别、信息采集监测和审计、网络专线传输、防入侵、防病毒、信息加密存储、信息访问的权限管理、信息认证授权和监控审计、信息脱敏、信息溯源等）以及配套的管理体系来保护您的个人信息。同时我们已设立用户信息保护责任部门，建立相关内控制度，对可能接触到您信息的工作人员采取最小够用授权原则；不断对工作人员培训相关法律法规、隐私政策和安全意识，对工作人员处理您的信息的行为进行系统监控。我们每年会接受相关国家机构的信息安全检查。
          </p>
          <p class="entry">
            （二）您须承诺妥善保存登录的账号、密码等信息，由于您的原因造成账号密码的泄露产生的后果由您承担。为防止信息泄露，我们将采取防泄漏、反爬虫等技术手段，限制频繁查询您的信息等异常操作行为，以防止账号密码泄露或他人冒用身份造成您产生不良行为记录或者您的信息泄露。
          </p>
          <p class="entry">
            （三）我们已制定个人信息安全事件应急预案，提高应急处理能力。但由于技术水平限制及可能存在的各种恶意手段，有可能因我们可控范围外的因素而出现安全问题。在发生个人信息安全事件后，我们将按照相关法律法规及监管政策的要求，及时向您告知：安全事件的基本情况和可能影响、我们已采取或将要采取的处置措施、您可自主防范和降低风险的建议、对您的补救措施等。我们将及时将事件相关情况以邮件、信函、电话、推送通知等方式告知您，难以逐一告知个人信息主体时，我们会采取合理、有效的方式发布公告。同时，我们还将按照监管部门要求，主动上报个人信息安全事件的处置情况。
          </p>
          <p class="entryHeader">五、 我们如何处理儿童的个人信息</p>
          <p class="entry">（一）我们非常重视对未成年人个人信息的保护。我们将根据国家相关法律法规及监管政策的规定保护未成年人的个人信息。
          </p>
          <p class="entry">（二）对于经父母或法定监护人同意而收集未成年人个人信息的情况，我们只会在受到法律允许、父母或法定监护人明确同意或者保护未成年人所必要的情况下使用或公开披露此信息。
          </p>
          <p class="entry">（三）如果我们发现自己在未事先获得可证实的父母或法定监护人同意的情况下收集了未成年人的个人信息，会设法尽快删除相关数据。
          </p>
          <p class="entryHeader">六、 您的个人信息如何存储及在全球范围转移</p>
          <p class="entry">
            我们在中华人民共和国境内收集的个人信息，将存储在中华人民共和国境内。我们仅在本政策所述目的所必需期间和法律法规及监管规定的时限内保留您的个人信息。如果需要将您的个人信息转移到境外，我们将：
          </p>
          <p class="entry">1.另行获得您的授权同意，并履行法定程序，在符合届时适用法律的情形下使您的个人信息得到足够的保护；
          </p>
          <p class="entry">2.该等转移将在符合届时适用法律要求的前提下进行，即便获得您的授权但是转移方式或者目的不符合相关法律法规规定的，我们也不会进行转移。
          </p>
          <p class="entryHeader">七、本政策如何更新</p>
          <p class="entry">
            我们的隐私政策可能变更。未经您明确同意，我们不会削减您按照本隐私政策所应享有的权利。基于为给您提供更好的服务以及随着电信业务的发展或法律法规及监管政策变化，我们可能会适时对本政策进行更新。由于我们的用户较多，如本政策发生重大变更，我们将以推送通知、发送邮件、信函、电话或者在中国联通官方网站发布公告的方式来通知您。若您在本政策修订后继续使用我们的产品或服务，这表示您已充分阅读、理解并愿意受修订后的本政策约束。
          </p>
          <p class="entryHeader">八、您的权利</p>
          <p class="entry">（一）访问您的个人信息</p>
          <p class="entry">
            您有权访问您的个人信息，法律法规规定的例外情形除外。您可前往中国联通当地营业厅、拨打10010客服热线、访问http://www.10010.com网上营业厅、使用手机营业厅APP等多种方式，查询您的个人信息或修改您的个人资料。
          </p>
          <p class="entry">（二）更正您的个人信息</p>
          <p class="entry">当您发现我们处理的关于您的个人信息有错误时，您有权要求我们做出更正。您可以通过“（一）访问您的个人信息”中罗列的方式提出更正申请。
          </p>
          <p class="entry">（三）删除您的个人信息</p>
          <p class="entry">在以下情形中，您可以向我们提出删除个人信息的请求：</p>
          <p class="entry">1.如果我们处理个人信息的行为违反法律法规；</p>
          <p class="entry">2.如果我们收集、使用您的个人信息，却未征得您的同意；</p>
          <p class="entry">3.如果我们处理个人信息的行为违反了与您的约定；</p>
          <p class="entry">4.如果您不再使用我们的产品或服务，或您注销了账号；</p>
          <p class="entry">5.如果我们不再为您提供产品或服务。</p>
          <p class="entry">（四）个人信息主体注销账号</p>
          <p class="entry">
            您在注销账号后，您该账号内的所有信息将被清空，我们将不会再收集、使用或共享与该账号相关的个人信息，但之前的信息我们仍需按照监管政策的时间进行保存，且在该依法保存的时间内有权机关仍有权依法查询。
          </p>
          <p class="entry">（五）改变您授权同意的范围</p>
          <p class="entry">
            每个业务功能需要一些基本的个人信息才能得以完成。对于额外收集的个人信息的收集和使用，您可以随时给予或收回您的授权同意。您可以前往中国联通当地营业厅、访问http://www.10010.com网上营业厅、使用手机营业厅APP等多种方式设置（如历史记录设置等）来关闭部分功能选项从而撤销部分授权。当您撤回同意或授权后，我们无法继续为您提供撤回同意或授权所对应的服务，也将不再处理您相应的个人信息。但您撤回同意或授权的决定，不会影响此前基于您的同意或授权而开展的个人信息处理。
          </p>
          <p class="entry">（六）响应您的上述请求</p>
          <p class="entry">
            为保障安全，您可能需要提供书面请求，或以其他方式证明您的身份。我们可能会先要求您验证自己的身份，然后再处理您的要求。对于您关于用户个人信息的合理请求，我们原则上不收取费用，但对多次重复、超出合理限度的请求，我们将视情收取一定成本费用。对于那些无端重复、需要过多技术手段、给他人合法权益带来风险或者非常不切实际的请求，我们可能会予以拒绝。在以下情形中，按照法律法规及监管政策要求，我们将无法响应您的请求：
          </p>
          <p class="entry">1.与国家安全、国防安全直接相关的；</p>
          <p class="entry">2.与公共安全、公共卫生、重大公共利益直接相关的；</p>
          <p class="entry">3.与犯罪侦查、起诉、审判和判决执行等直接相关的；</p>
          <p class="entry">4.有充分证据表明您存在主观恶意或滥用权利的；</p>
          <p class="entry">5.响应您的请求将导致您或其他个人、组织的合法权益受到严重损害的；</p>
          <p class="entry">6.涉及商业秘密的。</p>
          <p class="entryHeader">九、如何联系我们</p>
          <p class="entry">公司名称：中国联合网络通信有限公司</p>
          <p class="entry">注册地址：北京市西城区金融大街21号联通大厦</p>
          <p class="entry">联系方式: 10010客服热线</p>
          <p class="entry"> 网站：http://www.10010.com</p>
          <p class="entry">
            如您对本隐私政策或您个人信息的相关事宜有任何问题、意见或建议，您可前往中国联通当地营业厅、拨打10010客服热线、访问http://www.10010.com网上营业厅、使用手机营业厅APP等多种方式与我们联系。
            一般情况下，我们将在三十天内回复。如果您对我们的回复不满意，您还可以向相关监管部门进行投诉或举报。
          </p>
          <p class="entry"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="agreement">同意协议</el-button>
      </div>
    </el-dialog>
    <SuperForm v-model="value" :fields="fields" :model="model" :footer="footer" :title="title" @submit="handleSubmit"/>
  </div>
</template>

<script>
  import SIdentify from '@/components/SIdentify/index'
  import {captchaImage, login} from '@/api/common'
  import {encrypt} from '@/libs/tools'
  import {getjoiningFirst, orgList, standardizationSave, getExamListNow, getDemocraticAppraisalList, checkCongratulation} from '@/api/pc'
  import SuperForm from "@/components/custom-form/superForm/SuperForm";

  export default {
    name: 'login',
    components: {
      SIdentify,
      SuperForm,
    },
    data() {
      const validatorCode = (rule, value, callback) => {
        if (value === this.indetifyCode) {
          callback()
        } else if (value) {
          this.makeCode()
        }
        return callback(new Error('验证码输入错误'))
      }
      return {
        orgList: [],
        value: {},
        footer: true,
        model: {},
        fields: [],
        title: '',
        loginForm: {
          loginName: '',
          password: '',
          loginIdentify: '',
          uuid: ''
        },
        loginRules: {
          loginName: [{required: true, trigger: 'blur', message: '请输入账号'}],
          password: [{required: true, trigger: 'blur', message: '请输入密码'}],
          loginIdentify: [{validator: validatorCode, trigger: 'blur'}]
        },
        passwordType: 'password',
        loading: false,
        indetifyCode: '', // 验证码
        agree: true,
        dialogVisible: false
      }
    },
    methods: {
      getOrgName(value) {
        const index = this.orgList.findIndex(item => item.value === value)
        return index !== -1 && this.orgList[index].label ? this.orgList[index].label : ''
      },
      getOrgList() {
        orgList({}).then(res => {
          if (res.code === 0) {
            this.orgList = []
            res.data.forEach(item => {
              this.orgList.push({label: item.orgName, value: item.id})
            })
          }
        })
      },
      handleSubmit(form) {
        const data = {}
        data.status = '0'
        data.userName = form.model.userName
        data.phone = form.model.phone
        data.applyOrgId = form.model.applyOrgId
        data.orgName = this.getOrgName(data.applyOrgId)
        data.partyStandardizationFlow = {}
        const fields = form.fields
        for (const a in form.model) {
          if (form.model.hasOwnProperty(a)) {
            if (typeof form.model[a] === 'string') {
              form.model[a] = form.model[a].replace(/\r\n/g, '<br>').replace(/\n/g, '<br/>')
            }
          }
        }
        fields.forEach(item => {
          item.props.value = form.model[item.prop]
        })
        data.partyStandardizationFlow.customForm = JSON.stringify(fields)

        standardizationSave(data).then(res => {
          if (res.code === 0) {
            this.$message.success('添加成功')
            this.value = {}
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      agreement() {
        this.dialogVisible = false
        this.agree = true
      },
      validatorAgree() {
        if (this.agree === true) {
          return true
        } else {
          return false
        }
      },
      makeCode() {
        captchaImage().then(res => {
          console.log(res)
          if (res.code * 1 === 0) {
            this.indetifyCode = 'data:image/gif;base64,' + res.data.img
            this.loginForm.uuid = res.data.uuid
          }
        })
      },
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            if (!this.validatorAgree()) {
              this.$message.info('请阅读协议，同意协议才可登录')
              return
            }
            let data = {
              userName: encrypt(this.loginForm.loginName),
              password: encrypt(this.loginForm.password),
              code: this.loginForm.loginIdentify,
              uuid: this.loginForm.uuid,
              supplierId: this.$store.state.app.id
            }
            login(data).then(res => {
              if (res.code === 0) {
                sessionStorage.setItem('token', res.data.token)
                this.$store.commit('app/SET_TOKEN', res.data.token)
                this.$message.success('登录成功')
                this.$router.push({path: '/pc/profile'})
                this.getExamList()
                this.getDemocraticAppraisalList()
                this.getCardMessage()
              } else {
                this.$message.error(res.msg)
                this.makeCode()
              }
            })
          } else {
            return false
          }
        })
      },
      getExamList() {
        getExamListNow({ pageSize: 99999, pageNum: 1 }, { paperTypeId: '1' }).then(res => {
          if (res.code * 1 === 0) {
            const temp = res.data.list
            if (temp.length > 0) {
              this.$confirm('您还有未完成的考试，请尽快完成', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
              }).catch(() => {})
            }
          }
        })
      },
      getDemocraticAppraisalList() {
        const params = {
          pageSize: 9999,
          pageNum: 1,
          time: (new Date().getTime() - (new Date().getTime() % 1000)) / 1000
        }
        getDemocraticAppraisalList(params).then(res => {
          if (res.code * 1 === 0) {
            const temp = res.data
            if (temp.length > 0) {
              this.$confirm('您还有未完成的民主评议，请尽快完成', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {}).catch(() => {})
            }
          }
        })
      },
      hanleApplicate() {
        getjoiningFirst().then(res => {
          if (res.code === 0) {
            this.fields = res.data[0].partyCustomForm.customForm
            this.fields = JSON.parse(this.fields)
            this.fields.unshift({
              label: '组织',
              prop: 'applyOrgId',
              props: {
                placeholder: '请选择组织'
              },
              options: this.orgList,
              rules: [
                {
                  message: '请选择组织',
                  required: true,
                  trigger: 'change'
                }
              ],
              type: 'select'
            })
            this.fields.unshift({
              label: '手机号码',
              prop: 'phone',
              props: {
                placeholder: '请输入手机号码'
              },
              rules: [
                {
                  message: '请输入手机号码',
                  required: true
                }
              ],
              type: 'input'
            })
            this.fields.unshift({
              label: '用户名',
              prop: 'userName',
              props: {
                placeholder: '请输入用户名'
              },
              rules: [
                {
                  message: '请输入用户名',
                  required: true,
                  trigger: 'blur'
                }
              ],
              type: 'input'
            })
            this.title = '新增' + res.data[0].stepName
            this.model = {}
            this.value = {time: new Date()}
          }
        })
      },
      getCardMessage() {
        checkCongratulation().then(res => {
          if (res.code * 1 === 0) {
            this.$alert(res.data.congratulationCards.content, res.data.congratulationCards.title, {
              confirmButtonText: '确定'
            }).then(() => {}).catch(() => {})
          }
        })
      }
    },
    mounted() {
      this.makeCode()
      this.getOrgList()
    }
  };
</script>

<style lang="less" scoped>
  .login {
    width: 100%;
    margin: 0 auto;
    padding: 10px 10px 0;

    .title {
      margin-bottom: 8px;
      text-align: center;
      color: #E3393D;
      /*color: #335C88;*/
      font-size: 16px;
      font-weight: bold;
    }

    .code {
      border: 1px solid #DCDFE6;
      height: 30px;
      line-height: 30px;
    }

    img {
      height: 20px;
      width: 17px;
      margin-left: 3px;
    }

    .footer{
      width: 95%;
      margin: auto;
      .btn {
        width: 90%;
        margin: 0 10px;
        height: 30px;
        padding: 0;
        text-align: center;
      }

      .loginBtn {
        background-color: #f35255;
        color: #ffffff;
      }

      .loginBtn:hover {
        background-color: #E3393D;
      }

      .applicate{
        color: #f35255;
        border: #f35255 1px solid;
        /*color: #335C88;*/
        /*border: #335C88 1px solid;*/
      }
    }


    .entryHeader {
      font-weight: bold;
      line-height: 24px;
    }

    .entry {
      margin: 5px 0;
    }

    .agreement_head {
      font-size: 22px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    p {
      text-indent: 2em;
      line-height: 24px;
      text-align: justify;
    }

    .agreement {
      cursor: pointer;
      font-size: 12px;
    }

    .agree {
      line-height: 28px;
    }

    .agree /deep/ .el-checkbox__inner:hover {
      border-color: #E4393C;
      /*border-color: #335C88;*/
    }

    .agree /deep/ .el-checkbox__label {
      font-size: 12px;
      padding-left: 5px;
    }

    .agree /deep/ .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background-color: #E4393C;
      border-color: #E4393C;
      /*background-color: #335C88;*/
      /*border-color: #335C88;*/
    }

    .agree /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
      color: #E4393C;
      /*color: #335C88;*/
    }

    .login-form /deep/ .el-form-item {
      margin-bottom: 10px;
      line-height: 30px;
    }

    .login-form /deep/ .el-input__inner {
      font-size: 13px;
      height: 30px;
      line-height: 30px;
    }

    .login-form /deep/ .el-form-item__error {
      padding: 0px;
    }
  }
</style>
