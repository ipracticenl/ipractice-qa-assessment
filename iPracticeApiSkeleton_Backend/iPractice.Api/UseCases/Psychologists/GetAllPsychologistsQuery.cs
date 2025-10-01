using iPractice.Api.Controllers.Psychologists.Dtos;
using iPractice.Api.Repositories;
using MediatR;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace iPractice.Api.UseCases.Psychologists;

public class GetAllPsychologistsQuery : IRequest<List<PsychologistSummaryDto>>
{
}

public class GetAllPsychologistsHandler : IRequestHandler<GetAllPsychologistsQuery, List<PsychologistSummaryDto>>
{
    private readonly IPsychologistSqlRepository _psychologistRepository;

    public GetAllPsychologistsHandler(IPsychologistSqlRepository psychologistRepository)
    {
        _psychologistRepository = psychologistRepository;
    }

    public async Task<List<PsychologistSummaryDto>> Handle(GetAllPsychologistsQuery request, CancellationToken cancellationToken)
    {
        var psychologists = await _psychologistRepository.GetAllPsychologistsAsync(cancellationToken);
        
        return psychologists.Select(p => new PsychologistSummaryDto(p.Id, p.Name)).ToList();
    }
} 