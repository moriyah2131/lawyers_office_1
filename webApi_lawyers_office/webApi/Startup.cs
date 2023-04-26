using BLL.classes;
using BLL.interfaces;
using Dal.functions;
using Dal.interfaces;
using Dal.models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace webApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddRazorPages();
            services.AddServerSideBlazor();
            services.AddControllers();
            //הגדרה למנהל התלויות איזה מופע ליצור עבור כל ממשק
            services.AddScoped(typeof(Icities), typeof(CitiesFunc));
            services.AddScoped(typeof(IcitiesBll), typeof(CitiesBll));

            services.AddScoped(typeof(Ipayments), typeof(PaymentsFunc));
            services.AddScoped(typeof(IpaymentsBll), typeof(PaymentsBll));

            services.AddScoped(typeof(Ilinks), typeof(LinksFunc));
            services.AddScoped(typeof(IlinksBll), typeof(LinksBll));

            services.AddScoped(typeof(IfilePatterns), typeof(FilePatternsFunc));
            services.AddScoped(typeof(IfilePatternsBll), typeof(FilePatternsBll));

            services.AddScoped(typeof(IactionPatterns), typeof(ActionPatternsFunc));
            services.AddScoped(typeof(IactionPatternsBll), typeof(ActionPatternsBll));

            services.AddScoped(typeof(Ifiles), typeof(FilesFunc));
            services.AddScoped(typeof(IfilesBll), typeof(FilesBll));

            services.AddScoped(typeof(Iactions), typeof(ActionsFunc));
            services.AddScoped(typeof(IactionsBll), typeof(ActionsBll));

            services.AddScoped(typeof(Iaccounts), typeof(AccountsFunc));
            services.AddScoped(typeof(IaccountsBll), typeof(AccountsBll));

            services.AddScoped(typeof(Ibags), typeof(BagsFunc));
            services.AddScoped(typeof(IbagsBll), typeof(BagsBll));

            services.AddScoped(typeof(IbagsToPerson), typeof(BagsToPersonFunc));

            services.AddScoped(typeof(Ipeople), typeof(PeopleFunc));
            services.AddScoped(typeof(IpeopleBll), typeof(PeopleBll));

            services.AddScoped(typeof(Iusers), typeof(UsersFunc));

            services.AddScoped(typeof(Iassets), typeof(AssetsFunc));

            //הוספת הגדרה למנהל התלויות על מסד הנתונים
            services.AddDbContext<Layers_OfficeContext>(opt => opt.UseSqlServer("Server=localhost;Database=Layers_Office;Trusted_Connection=true"));
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", p =>
                {
                    p.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                });
            });
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "webApi", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "webApi v1"));
            }

            app.UseHttpsRedirection();

            app.UseCors("AllowAll");

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
