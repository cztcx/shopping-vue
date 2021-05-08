<template>
  <div>
    <el-table :data="tableData">
      <el-table-column prop="username" label="收货人姓名">
      </el-table-column>
      <el-table-column prop="address" label="收货人地址">
      </el-table-column>
      <el-table-column prop="phone" label="收货人电话">
      </el-table-column>
      <el-table-column prop="id" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="show(scope.row.id)" plain>修改</el-button>
          <el-button type="danger" size="small" @click="deleteAddress(scope.row.id)" plain>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="getAllProvinceAndCityList" size="small">添加新收货人</el-button>
    <el-dialog title="添加收货人" :visible.sync="dialogFormVisible" style="text-align: center">
      <el-form :ref="form" :rules="rules" :model="form">
        <el-form-item label="收货人姓名" prop="username" label-width="100px">
          <el-input v-model="form.username" class="input" size="small"></el-input>
        </el-form-item>
        <el-form-item label="收货人地址" label-width="100px">
          <el-form-item prop="province" label="省" label-width="80px">
            <el-select v-model="form.province" placeholder="请选择省份（直辖市）" @change="renderCity">
              <el-option
                v-for="item in provinceListAll"
                :key="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="city" label="市" v-if="citySelectAble" label-width="80px">
            <el-select v-model="form.city" placeholder="请选择城市" @change="renderArea">
              <el-option
                v-for="item in cityListAll"
                :key="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="area" label="区/县" v-if="areaSelectAble" label-width="80px">
            <el-select v-model="form.area" placeholder="请选择区/县" @change="renderDetailed">
              <el-option
                v-for="item in areaListAll"
                :key="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="street" label="街道" v-if="streetSelectAble" label-width="80px">
            <el-select v-model="form.street" placeholder="请选择街道">
              <el-option
                v-for="item in detailedListAll"
                :key="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="detailed" label="详细信息" label-width="80px">
            <el-input v-model="form.detailed" class="input" size="small"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="收货人电话" prop="phone" label-width="100px">
          <el-input v-model="form.phone" class="input" size="small"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="pushAddress(form)">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改收货人" :visible.sync="updateFormVisible" style="text-align: center">
      <el-form :ref="updateForm" :rules="rules" :model="updateForm" label-width="80px">
        <el-form-item label="收货人姓名" prop="username" label-width="100px">
          <el-input v-model="updateForm.username" class="input" size="small"></el-input>
        </el-form-item>
        <el-form-item label="收货人地址" label-width="100px">
          <el-form-item prop="province" label="省" label-width="80px">
            <el-select v-model="updateForm.province" placeholder="请选择省份（直辖市）" @change="renderUpdateCity">
              <el-option
                v-for="item in provinceListAll"
                :key="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="city" label="市" v-if="cityUpdateSelectAble" label-width="80px">
            <el-select v-model="updateForm.city" placeholder="请选择城市" @change="renderUpdateArea">
              <el-option
                v-for="item in cityListAll"
                :key="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="area" label="区/县" v-if="areaUpdateSelectAble" label-width="80px">
            <el-select v-model="updateForm.area" placeholder="请选择区/县" @change="renderUpdateDetailed">
              <el-option
                v-for="item in areaListAll"
                :key="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="street" label="街道" v-if="streetUpdateSelectAble" label-width="80px">
            <el-select v-model="updateForm.street" placeholder="请选择街道">
              <el-option
                v-for="item in detailedListAll"
                :key="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="detailed" label="详细信息" label-width="80px">
            <el-input v-model="updateForm.detailed" class="input" size="small"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="收货人电话" prop="phone" label-width="100px">
          <el-input v-model="updateForm.phone" class="input" size="small"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateFormVisible = false">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="updateAddress(updateForm)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
import {getId} from '../../utils/session'

const {mapState, mapActions} = createNamespacedHelpers('addressModule')
export default {
  name: 'Address',
  data () {
    return {
      modal1: false,
      isEdit: false,
      provinceListAll: [], // 全国34个省份（包括直辖市）列表
      cityListAll: [], // 全国各个城市列表
      areaListAll: [], // 城市地区各个区列表
      detailedListAll: [], // 街道列表
      citySelectAble: false, // 城市是否可选
      areaSelectAble: false,
      streetSelectAble: false,
      cityUpdateSelectAble: false, // 城市是否可选
      areaUpdateSelectAble: false,
      streetUpdateSelectAble: false,
      loading: false,
      updateFormVisible: false,
      dialogFormVisible: false,
      tableData: [],
      form: {
        province: '', // 所属省（直辖市)
        city: '', // 所属市
        area: '', // 所属区
        street: '', // 所属街道
        detailed: '',
        username: '',
        phone: '',
        userId: getId()
      },
      realForm: {
        address: '',
        username: '',
        phone: '',
        userId: getId()
      },
      realUpdateForm: {
        address: '',
        username: '',
        phone: '',
        userId: getId(),
        id: ''
      },
      updateForm: {
        province: '', // 所属省（直辖市)
        city: '', // 所属市
        area: '', // 所属区
        street: '', // 所属街道
        detailed: '',
        username: '',
        phone: '',
        userId: getId(),
        id: ''
      },
      rules: {
        province: [{required: true, message: '请输入所属省份（或者直辖市）', trigger: 'blur'}],
        city: [{required: true, message: '请输入所属市', trigger: 'blur'}],
        area: [{required: true, message: '请输入所属区（或者县）', trigger: 'blur'}],
        street: [{required: true, message: '请输入所属街道', trigger: 'blur'}],
        detailed: [{required: true, message: '请输入详细信息（社区、村、门牌号）', trigger: 'blur'}],
        username: [
          {required: true, message: '收货人姓名不能为空', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '收货人手机号不能为空', trigger: 'blur'},
          {
            validator: function (rule, value, callback) {
              if (/^1[34578]\d{9}$/.test(value) === false) {
                callback(new Error('手机号格式错误'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      data: state => state.data,
      address: state => state.address
    })
  },
  created () {
    this.getAllAddress()
  },
  methods: {
    ...mapActions(['getAll', 'create', 'retrieve', 'update', 'Delete']),
    removeFlavor (item) {
      var index = this.form.addressList.indexOf(item)
      if (index !== -1) {
        this.form.addressList.splice(index, 1)
      }
    },
    addFlavor () {
      this.form.addressList.push({
        name: '',
        address: '',
        phone: ''
      })
    },
    getAllAddress () {
      this.getAll(getId()).then(() => {
        this.tableData = this.data
      }).catch(() => {
        alert('内部出错，请重试！')
      })
    },
    pushAddress (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.loading = true
          console.log(form)
          this.realForm.address = form.province + form.city + form.area + form.street + form.detailed
          this.realForm.username = form.username
          this.realForm.phone = form.phone
          console.log(this.realForm)
          this.create(this.realForm).then(() => {
            this.loading = false
            this.dialogFormVisible = false
            this.$message({
              message: '恭喜你，添加成功',
              type: 'success'
            })
            location.reload()
          }).catch(() => {
            this.loading = false
            this.dialogFormVisible = true
            this.$message({
              message: '内部原因，添加失败',
              type: 'danger'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    show (id) {
      this.provinceListAll = [] // 全国34个省份（包括直辖市）列表
      this.cityListAll = []
      this.areaListAll = []
      var that = this
      this.$http.get('https://restapi.amap.com/v3/config/district', {
        params: {
          key: '4c8541b4eeaee30f1ee2e9913768119b',
          keywords: '中国',
          subdistrict: 3,
          extensions: 'base'
        }
      }).then((response) => {
        that.provinceListAll = response.data.districts[0].districts
        for (let i = 0; i < response.data.districts[0].districts.length; i++) {
          for (let j = 0; j < response.data.districts[0].districts[i].districts.length; j++) {
            that.cityListAll.push(response.data.districts[0].districts[i].districts[j])
          }
        }
        for (let i = 0; i < that.cityListAll.length; i++) {
          that.areaListAll.push(that.cityListAll[i].districts)
        }
      })
      this.retrieve(id).then(() => {
        this.updateForm.phone = this.address.phone
        this.updateForm.username = this.address.username
        this.updateFormVisible = true
      }).catch(() => {
        this.$message.error('由于内部原因，暂时无法修改')
      })
    },
    updateAddress (updateForm) {
      this.$refs[updateForm].validate((valid) => {
        if (valid) {
          this.realForm.address = updateForm.province + updateForm.city + updateForm.area + updateForm.street + updateForm.detailed
          this.realForm.username = updateForm.username
          this.realForm.phone = updateForm.phone
          this.realForm.id = this.address.id
          console.log(this.realForm)
          this.update(this.realForm).then(() => {
            this.updateFormVisible = false
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            location.reload()
          }).catch(() => {
            this.updateFormVisible = true
            this.$message.error('由于内部原因，修改失败')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    deleteAddress (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.Delete(id).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          location.reload()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      })
    },
    getAllProvinceAndCityList () {
      this.provinceListAll = [] // 全国34个省份（包括直辖市）列表
      this.cityListAll = []
      this.areaListAll = []
      this.dialogFormVisible = true
      var that = this
      this.$http.get('https://restapi.amap.com/v3/config/district', {
        params: {
          key: '4c8541b4eeaee30f1ee2e9913768119b',
          keywords: '中国',
          subdistrict: 3,
          extensions: 'base'
        }
      }).then((response) => {
        that.provinceListAll = response.data.districts[0].districts
        for (let i = 0; i < response.data.districts[0].districts.length; i++) {
          for (let j = 0; j < response.data.districts[0].districts[i].districts.length; j++) {
            that.cityListAll.push(response.data.districts[0].districts[i].districts[j])
          }
        }
        for (let i = 0; i < that.cityListAll.length; i++) {
          that.areaListAll.push(that.cityListAll[i].districts)
        }
        console.log('省份', that.provinceListAll)
        console.log('城市', that.cityListAll)
        console.log('区/县', that.areaListAll)
      })
    },

    renderCity () {
      if (this.form.province.length > 0) {
        this.cityListAll = this.provinceListAll.filter(item => item.name === this.form.province)[0].districts
        this.citySelectAble = true
      } else if (!this.form.province) {
        this.citySelectAble = false
      }
    },
    renderUpdateCity () {
      if (this.updateForm.province.length > 0) {
        this.cityListAll = this.provinceListAll.filter(item => item.name === this.updateForm.province)[0].districts
        this.cityUpdateSelectAble = true
      } else if (!this.updateForm.province) {
        this.cityUpdateSelectAble = false
      }
    },

    renderArea () {
      if (this.form.city.length > 0) {
        this.areaListAll = this.cityListAll.filter(item => item.name === this.form.city)[0].districts
        this.areaSelectAble = true
      } else if (!this.form.city) {
        this.areaSelectAble = false
        this.form.area = ''
      }
    },
    renderUpdateArea () {
      if (this.updateForm.city.length > 0) {
        this.areaListAll = this.cityListAll.filter(item => item.name === this.updateForm.city)[0].districts
        this.areaUpdateSelectAble = true
      } else if (!this.updateForm.city) {
        this.areaUpdateSelectAble = false
        this.updateForm.area = ''
      }
    },
    renderDetailed () {
      if (this.form.area.length > 0) {
        this.$http.get('https://restapi.amap.com/v3/config/district', {
          params: {
            key: '4c8541b4eeaee30f1ee2e9913768119b',
            keywords: this.form.area,
            subdistrict: 1,
            extensions: 'base'
          }
        }).then((response) => {
          this.detailedListAll = response.data.districts[0].districts
        })
        this.streetSelectAble = true
      } else if (!this.form.city) {
        this.streetSelectAble = false
        this.form.street = ''
      }
    },
    renderUpdateDetailed () {
      if (this.updateForm.area.length > 0) {
        this.$http.get('https://restapi.amap.com/v3/config/district', {
          params: {
            key: '4c8541b4eeaee30f1ee2e9913768119b',
            keywords: this.updateForm.area,
            subdistrict: 1,
            extensions: 'base'
          }
        }).then((response) => {
          this.detailedListAll = response.data.districts[0].districts
        })
        this.streetUpdateSelectAble = true
      } else if (!this.updateForm.city) {
        this.streetUpdateSelectAble = false
        this.updateForm.street = ''
      }
    }
  }
}
</script>

<style scoped>

</style>
